import express from "express";
import chatRouter from "./routes/ai-chat.js";
import inquiryRouter from "./routes/inquiry.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import paymentRouter from "./routes/payment.js"
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import "./controller/taskScheduler.js"

export const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://neighborhue-frontend.vercel.app",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  maxAge: 7200,
}));

app.use("/api/ai-chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/auth", authRouter);
app.use("/register", userRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});
