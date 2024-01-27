// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  profilePic: { type: String }, // Assuming the profile picture is a URL
});

export const User = mongoose.model('User', userSchema);

// export const Inquiry = mongoose.model("Inquiry", schema);
