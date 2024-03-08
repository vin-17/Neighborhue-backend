import express from "express";
import dotenv from 'dotenv';
import { PremiumPurchaseUpdate, onetimePurchaseUpdate } from "../controller/user.js"; // Import the function to update user data
import Stripe from 'stripe';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const router = express.Router();


//route to handle payment requests
router.post('/checkout-session-onetime', async (req, res) => {
    try {
      // Retrieve amount and email from the request body
      const { amount, email } = req.body;

    //   const customer = await stripe.customers.create({
    //     email: email,
    //   });

      
  
      // Create a Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // Update with your currency
              product_data: {
                name: '8 additional token', // Update with your product name
              },
              unit_amount: amount,
            },
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/`, // Update with your success URL
        cancel_url: `${process.env.FRONTEND_URL}/pricing`, // Update with your cancel URL
        customer_email: email,
      });
  
      // Send the session ID back to the client
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the Checkout session' });
    }
  });

  router.post('/checkout-session-premium', async (req, res) => {
    try {
      // Retrieve amount and email from the request body
      const { amount, email } = req.body;

    //   const customer = await stripe.customers.create({
    //     email: email,
    //   });

      
  
      // Create a Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // Update with your currency
              product_data: {
                name: 'Premium Plan ( Unlimited Tokens for one month )', // Update with your product name
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/`, // Update with your success URL
        cancel_url: `${process.env.FRONTEND_URL}/pricing`, // Update with your cancel URL
        customer_email: email,
      });
  
      // Send the session ID back to the client
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the Checkout session' });
    }
  });


  router.post('/webhook', async (req, res) => {
    console.log("\nwebhook req body --->");
    const data = req.body; 
    console.log("type ", data.type);
    console.log("email ", data.data.object.customer_email);
    console.log("amountpaid ", data.data.object.amount_total);
    // console.log("type ", data.type);

    try {
        switch (data.type) {
            case 'checkout.session.completed':

                
                // Extract relevant information from the data object
                const paymentIntentId = data.data.object.payment_intent;
                const email = data.data.object.customer_email;
                const amountpaid = data.data.object.amount_total;
                // Update your database with the successful payment
                if(amountpaid == 199){
                    await onetimePurchaseUpdate(email, paymentIntentId);
                }
                if(amountpaid == 999){
                    await PremiumPurchaseUpdate(email, paymentIntentId);
                }
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type: ${data.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.json({ received: true });
    } catch (error) {
        console.error('Error handling webhook event:', error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

  
  
  export default router;


