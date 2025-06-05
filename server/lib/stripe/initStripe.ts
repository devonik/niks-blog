import Stripe from 'stripe'
let stripe: unknown
export default async () => {
  if (!stripe) {
    stripe = new Stripe(useRuntimeConfig().stripeSecretKey)
    throw new Error('Stripe not initialized')
  }
  return stripe
}
