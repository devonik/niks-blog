import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51RWMlaP5uWrb28mZTidba0X40JuuGxXrXX4fkEhXuj2Xh6khdPRyLCrmx4VWsLaeNXsuxo3IznJuT66KQ8xdlBm200H4cn59X4');
export default async () => {
    if (!stripe) {
        throw new Error('Stripe not initialized');
    }
    return stripe;
}