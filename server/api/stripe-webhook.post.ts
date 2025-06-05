import initStripe from '../lib/stripe/initStripe';
import fulfillCheckout from '../lib/stripe/fulfillCheckout';

// Use the secret provided by Stripe CLI for local testing
// or your webhook endpoint's secret.
const endpointSecret = 'whsec_fd24f4b333de0c207552675ac25976f076666c0f67fd4da6945f113430e22ab7';
export default defineEventHandler(async (event) => {
  const stripe = await initStripe()

  const headers = getHeaders(event);
  const body = await readRawBody(event);
  if(!body) throw createError({
    statusCode: 400,
    statusMessage: 'No body provided',
  });

const sig = headers['stripe-signature'];
if(!sig) throw createError({
    statusCode: 400,
    statusMessage: 'No stripe-signature header provided',
  });

  try {
    const stripeEvent = await stripe.webhooks.constructEventAsync(body, sig, endpointSecret);
    if (
    stripeEvent.type === 'checkout.session.completed'
    || stripeEvent.type === 'checkout.session.async_payment_succeeded'
    ) {
      await fulfillCheckout(stripeEvent.data.object.id);
    }
  } catch (err) {
    console.error('Error constructing Stripe event', err);
    let errorMessage = 'Unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Webhook Error: ${errorMessage}`,
    })
  }
  return 'Ok'
})
