import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    // unique: true,
    validate: {
        validator: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Invalid email address",
      },
  },
  problemDescription: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Inquiry = mongoose.model("Inquiry", schema);