import express from "express";
import openai from "openai";
import { useToken } from "../controller/user.js";
import { User } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const OpenAIAPIKey = process.env.OPEN_AI_KEY;
const openaiAPI = new openai.OpenAI({ apiKey: OpenAIAPIKey });

router.post("/chatbot", async (req, res) => {
  try {
    const { message, location, userEmail, free_tokens, is_free_token } =
      req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const completions = await openaiAPI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `i want to shift at ${location}. please give all replies or suggestions to me text message - ${message} at ${location}. Give answers according to the context do not go beyond that. Please give elaborated response.`,
        },
      ],
      temperature: 1,
      max_tokens: 299,
    });
    console.log(is_free_token);
    if (is_free_token) {
      const response = completions.choices[0].message.content;
      res.status(200).json({
        message: response,
      });
    }

    // Extract chatbot's reply from the API response
    // if (completions.choices && completions.choices.length > 0) {
    //   // const response = completions.choices[0].text;
    //   const response = completions.choices[0].message.content;
    //   // console.log(" --- response -- -- -- ")
    //   // console.log(response);
    //   // console.log(" --- completions -- -- -- ")
    //   // console.log(completions);
    //   // Check if user is premium


    //   async function updateToken(email) {
    //     try {
    //       const update_response = await useToken({ body: { email, message, response } }); // Pass only the request object
    //       console.log("\nthis is update response:: \n", update_response);
    //       return update_response;
    //     } catch (error) {
    //       console.error("Error updating response from updateToken :", error);
    //       throw error;
    //     }
    //   }

    if (
      completions.choices &&
      completions.choices.length > 0 &&
      !is_free_token
    ) {
      const response = completions.choices[0].message.content;
      console.log(response);
      async function updateToken(email) {
        try {
          const update_response = await useToken({
            body: { email, message, response },
          });
          console.log("\nthis is update response:: \n", update_response);
          return update_response;
        } catch (error) {
          console.error("Error updating response from updateToken:", error);
          throw error;
        }
      }

      try {
        const update_res = await updateToken(userEmail);
        if (update_res.error) {
          return res.status(400).json({ message: update_res.error });
        }

        res.setHeader(
          "Access-Control-Allow-Origin",
          `${process.env.FRONTEND_URL}`
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.status(200).json({
          message: response,
          user: {
            email: update_res.user.email,
            daily_tokens_available: update_res.user.daily_tokens_available,
            purchased_tokens_available:
              update_res.user.purchased_tokens_available,
            tokens_used: update_res.user.tokens_used,
          },
        });
      } catch (error) {
        res.setHeader(
          "Access-Control-Allow-Origin",
          `${process.env.FRONTEND_URL}`
        );
        res.status(500).json({
          message: "failed to update user data.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });

    if (error.response) {
      console.error("OpenAI API Error Response:", error.response.data);
      console.error("OpenAI API Error Status:", error.response.status);
      console.error("OpenAI API Error Headers:", error.response.headers);
    } else if (error.request) {
      console.error("OpenAI API No Response:", error.request);
    } else {
      console.error("OpenAI API Request Setup Error:", error.message);
    }
  }
});

router.post("/chathistory", async (req, res) => {
  try {
    const { email } = req.body.user;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the chat history from the user document
    res.setHeader(
      "Access-Control-Allow-Origin",
      `${process.env.FRONTEND_URL}`
    );
    res.status(200).json({ chats: user.chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
