import express from "express";
import chatRouter from "./routes/ai-chat.js";

export const app = express();

// Using Middlewares
app.use(express.json());


// Using routes
app.use("/api", chatRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
