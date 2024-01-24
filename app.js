import express from "express";
import chatRouter from "./routes/ai-chat.js";
import inquiryRouter from "./routes/inquiry.js";
import cors from "cors";

export const app = express();

// Using Middlewares
app.use(cors());
app.use(express.json());


// Using routes
app.use("/api/ai-chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
