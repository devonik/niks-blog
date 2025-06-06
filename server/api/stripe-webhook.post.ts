import initStripe from '../lib/stripe/initStripe'
import fulfillCheckout from '../lib/stripe/fulfillCheckout'

export default defineEventHandler(async (event) => {
  console.log('Stripe webhook received')
  const stripe = await initStripe()

  const headers = getHeaders(event)
  const body = await readRawBody(event)
  if (!body)
    throw createError({
      statusCode: 400,
      statusMessage: 'No body provided',
    })

  const sig = headers['stripe-signature']
  if (!sig)
    throw createError({
      statusCode: 400,
      statusMessage: 'No stripe-signature header provided',
    })

  const config = useRuntimeConfig()
  try {
    const stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      config.stripeWebhookSecret,
    )
    console.log('Stripe event constructed successfully. Type: ' + stripeEvent.type)
    if (
      stripeEvent.type === 'checkout.session.completed' ||
      stripeEvent.type === 'checkout.session.async_payment_succeeded'
    ) {
      await fulfillCheckout(stripeEvent.data.object.id)
    }
  } catch (err) {
    console.error('Error constructing Stripe event', err)
    let errorMessage = 'Unknown error'
    if (err instanceof Error) {
      errorMessage = err.message
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Webhook Error: ${errorMessage}`,
    })
  }
  return 'Ok'
})
