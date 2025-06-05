import fulfillCheckout from '../lib/stripe/fulfillCheckout'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Session ID is required',
    })
  }
  await fulfillCheckout(body.sessionId)
  return 'Ok'
})
