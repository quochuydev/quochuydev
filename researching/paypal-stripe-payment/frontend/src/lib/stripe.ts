import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log(`debug:stripePublicKey`, stripePublicKey);

export const stripePromise = loadStripe(stripePublicKey);
