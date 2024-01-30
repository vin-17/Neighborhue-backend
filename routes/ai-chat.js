import express from "express";
import openai from "openai";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// OpenAI API Client Setup
const OpenAIAPIKey = process.env.OPEN_AI_KEY;  
const openaiAPI = new openai.OpenAI({ apiKey: OpenAIAPIKey });

// Sample route to handle chatbot requests
router.post("/chatbot", async (req, res) => {
  try {
    const { message, location } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Set OpenAI API completion parameters
    const completions = await openaiAPI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `i want to shift at ${formData.location} . please give all replies or suggestion to me text message - ${formData.problem} at ${formData.location}. Give answer according to the context donot go beyond that.` },
        ],
        temperature: 1,
        max_tokens: 75,
      });

    // Extract chatbot's reply from the API response
    if (completions.choices && completions.choices.length > 0) {
        // const response = completions.choices[0].text;
        const response = completions.choices[0].message.content;
        console.log(" --- response -- -- -- ")
        console.log(response);
        console.log(" --- completions -- -- -- ")
        console.log(completions);
        
        res.status(200).json({ message: response });
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






export default router;
// router.post("/new", isAuthenticated, newTask); //create task
// router.get("/my", isAuthenticated, getMyTask); //all task

// router
//   .route("/:id")
//   .put(isAuthenticated, updateTask)
//   .delete(isAuthenticated, deleteTask);
