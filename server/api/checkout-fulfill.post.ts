import fulfillCheckout from '../lib/stripe/fulfillCheckout'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Session ID is required',
    })
  }
  try {
    await fulfillCheckout(body.sessionId)
  } catch (err) {
    console.error('Error fulfilling checkout:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fulfill checkout',
    })
  }

  return 'Checkout fulfilled finished'
})
