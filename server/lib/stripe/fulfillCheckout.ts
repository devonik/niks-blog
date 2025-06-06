import { GOOGLE_MAPS_LIST_LINKS, GOOGLE_MAPS_LIST_PRODUCT_KEY } from '../constants'
import { sendMail } from '../emailService'
import initStripe from './initStripe'

export default async (sessionId: string) => {
  const stripe = await initStripe()

  console.log('Fulfilling Checkout Session ' + sessionId)

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // performed for this Checkout Session
  // Maybe with nuxt storage ?

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  })
  console.log('checkoutSession', checkoutSession)

  // If not paid, do nothing
  if (checkoutSession.payment_status !== 'paid') return

  const formattedProductLines: Record<string, string> = {}
  checkoutSession.line_items?.data.forEach(async (item) => {
    if (item.price?.product) {
      const product = await stripe.products.retrieve(item.price.product as string)
      if (product.metadata['product-key']) {
        //Google maps list products
        Object.keys(GOOGLE_MAPS_LIST_PRODUCT_KEY.galapagos).forEach((key) => {
          if (product.metadata['product-key'] === GOOGLE_MAPS_LIST_PRODUCT_KEY.galapagos[key]) {
            console.log(`Google maps list ${key} bought`)
            formattedProductLines[product.name] = GOOGLE_MAPS_LIST_LINKS.galapagos[key]
          }
        })
        console.log(
          'Customer ' +
            checkoutSession.customer_details?.email +
            ' bought products. Will send email with links:',
          formattedProductLines,
        )
        if (checkoutSession.customer_details?.email) {
          await sendMail(
            checkoutSession.customer_details.email,
            'Your purchase was successful!',
            '',
            `
            <h3>Thank you for your purchase! Here are the details of your order:</h3>
            <ul>
              ${Object.entries(formattedProductLines)
                .map(([name, link]) => `<li>${name}: <a href="${link}">${link}</a></li>`)
                .join('')}
            </ul>
          `,
          )
        } else throw new Error('No customer email found in checkout session')
      } else {
        throw new Error('Unknown product key:' + product.metadata['product-key'])
      }
    }
  })
}
