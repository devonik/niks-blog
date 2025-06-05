import Stripe from 'stripe'
let stripe: unknown
export default async () => {
  if (!stripe) {
    stripe = new Stripe(useRuntimeConfig().stripeApiKey)
    if (!stripe) throw new Error('Stripe not initialized')
  }
  return stripe
}
