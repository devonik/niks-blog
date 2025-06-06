import Stripe from 'stripe'
let stripe: Stripe
export default async (): Promise<Stripe> => {
  if (!stripe) {
    stripe = new Stripe(useRuntimeConfig().stripeApiKey)
    if (!stripe) throw new Error('Stripe not initialized')
  }
  return stripe
}
