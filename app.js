import express from "express";
import chatRouter from "./routes/ai-chat.js";
import inquiryRouter from "./routes/inquiry.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import './passport.js';

// import passportSetup from "./passport.js";
// import { passportSetup } from "./passport.js";

export const app = express();

// Using Middlewares
app.use(cors({
  origin: "https://neighborhue-frontend.vercel.app",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(
  cookieSession({
    name: "session",
    keys: ["neighborhue-cookie"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());


// Using routes
app.use("/api/ai-chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/auth", authRouter);
app.use("/register", userRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});


