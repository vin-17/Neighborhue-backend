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
});


export const User = mongoose.model('User', userSchema);
// const userSchema = new mongoose.Schema({
//   username: { type: String },
//   email: { type: String, unique: true, required: true },
//   profilePic: { type: String }, // Assuming the profile picture is a URL
// });

// export const Inquiry = mongoose.model("Inquiry", schema);
