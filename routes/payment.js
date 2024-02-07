import express from "express";
import dotenv from 'dotenv';
import { onetimePurchaseUpdate } from "../controller/user.js"; // Import the function to update user data
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
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000', // Update with your success URL
        cancel_url: 'http://localhost:3000/register', // Update with your cancel URL
        customer_email: email,
      });
  
      // Send the session ID back to the client
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the Checkout session' });
    }
  });

  
  
  export default router;


  
  //   router.post('/webhook', async (req, res) => {
  //     const event = req.body;
  
  //     try {
  //         switch (event.type) {
  //             case 'checkout.session.completed':
  //                 const session = event.data.object;
  //                 // Extract relevant information from the session object
  //                 const paymentIntentId = session.payment_intent;
  //                 const customerEmail = session.customer_email;
  //                 // Update your database with the successful payment
  //                 await onetimePurchaseUpdate(customerEmail, paymentIntentId);
  //                 break;
  //             default:
  //                 // Unexpected event type
  //                 console.log(`Unhandled event type: ${event.type}`);
  //         }
  
  //         // Return a 200 response to acknowledge receipt of the event
  //         res.json({ received: true });
  //     } catch (error) {
  //         console.error('Error handling webhook event:', error.message);
  //         res.status(400).send(`Webhook Error: ${error.message}`);
  //     }
  // });