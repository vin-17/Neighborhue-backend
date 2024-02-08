// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  profilePic: { type: String },
  daily_tokens_available: { type: Number, default: 3 }, // Default value set to 3
  purchased_tokens_available: { type: Number, default: 0 }, // Default value set to 3
  tokens_used: { type: Number, default: 0 }, // Default value set to 0
  is_premium: { type: Boolean, default: false }, // Default value set to false
  payment_date: { type: Date }, // Add payment_date field
  chatHistory: [
    {
      role: { type: String, required: true }, // Role of the participant, e.g., "user" or "chatbot"
      content: { type: String, required: true } // Content of the message
    }
  ]
});


export const User = mongoose.model('User', userSchema);

