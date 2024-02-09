import express from "express";
import openai from "openai";
import dotenv from 'dotenv';
import { useToken } from "../controller/user.js";
import { User } from "../models/user.js"

dotenv.config();

const router = express.Router();

// OpenAI API Client Setup
const OpenAIAPIKey = process.env.OPEN_AI_KEY;  
const openaiAPI = new openai.OpenAI({ apiKey: OpenAIAPIKey });

// Sample route to handle chatbot requests
router.post("/chatbot", async (req, res) => {
  try {
    const { message, location, userEmail } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Set OpenAI API completion parameters
    const completions = await openaiAPI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `i want to shift at ${location} . please give all replies or suggestion to me text message - ${message} at ${location}. Give answer according to the context donot go beyond that.` },
        ],
        temperature: 1,
        max_tokens: 500,
      });

    // Extract chatbot's reply from the API response
    if (completions.choices && completions.choices.length > 0) {
        // const response = completions.choices[0].text;
        const response = completions.choices[0].message.content;
        // console.log(" --- response -- -- -- ")
        // console.log(response);
        // console.log(" --- completions -- -- -- ")
        // console.log(completions);
        // Check if user is premium
        

        async function updateToken(email) {
          try {
            const update_response = await useToken({ body: { email, message, response } }); // Pass only the request object
            console.log("\nthis is update response:: \n", update_response);
            return update_response;
          } catch (error) {
            console.error("Error updating response from updateToken :", error);
            throw error;
          }
        }
        try {
          const update_res = await updateToken(userEmail);
          if (update_res.error) {
            // Handle error response
            return res.status(400).json({ message: update_res.error });
          }
          // console.log("\nResponse------updateToken------:  ", update_res);
          res.setHeader('Access-Control-Allow-Origin', 'https://neighborhue-frontend.vercel.app');
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          res.status(200).json({ 
            message: response,
            user: {
              email: update_res.user.email,
              daily_tokens_available: update_res.user.daily_tokens_available,
              purchased_tokens_available: update_res.user.purchased_tokens_available,
              tokens_used: update_res.user.tokens_used,
            },
          });
        } catch (error) {
          // console.error("\nError------updateToken-----:  ", error);
          res.setHeader('Access-Control-Allow-Origin', 'https://neighborhue-frontend.vercel.app');
          res.status(500).json({ 
            message: "failed to update user data.",
          });
        }
        
      } else {
        console.log("this loop --- -- -- ")
        res.status(500).json({ error: 'Invalid response from OpenAI API' });
      }
      
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("server.js error caught")
    if (error.response) {
      // The request was made and the server responded with a non-2xx status
      console.error('OpenAI API Error Response:', error.response.data);
      console.error('OpenAI API Error Status:', error.response.status);
      console.error('OpenAI API Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('OpenAI API No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('OpenAI API Request Setup Error:', error.message);
    }
  }
});

router.post("/chathistory", async (req, res) => {
  try {
    const { email } = req.body.user;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the chat history from the user document
    res.setHeader('Access-Control-Allow-Origin', 'https://neighborhue-frontend.vercel.app');
    res.status(200).json({ chats: user.chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





export default router;

