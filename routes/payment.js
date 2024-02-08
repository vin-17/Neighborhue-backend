import express from "express";
import dotenv from "dotenv";
import {
  PremiumPurchaseUpdate,
  onetimePurchaseUpdate,
} from "../controller/user.js";
import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/checkout-session-premium", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      useremail: req.body.useremail,
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "premium",
          },
          unit_amount: 999,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer: customer.id,
    success_url: "http://localhost:3000/blogs",
    cancel_url: "http://localhost:3000/contact",
  });
  console.log(session.url);
  res.status(200).json({
    url: session.url,
  });
});



export default router;
