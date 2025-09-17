import dotenv from "dotenv";
dotenv.config();

export const config = {
  appUrl: process.env.APP_URL || "http://localhost:5173",
  stripePublicKey: process.env.STRIPE_PUBLIC_KEY || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  paypalClientId: process.env.PAYPAL_CLIENT_ID || "",
  paypalSecret: process.env.PAYPAL_SECRET || "",
  port: process.env.PORT || 3001,
};

console.log(`debug:config`, config);
