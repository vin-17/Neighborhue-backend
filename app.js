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

// import './passport.js';
// import passportSetup from "./passport.js";
// import { passportSetup } from "./passport.js";

// cron.schedule('* * * * *', hello);

export const app = express();

// Using Middlewares
const frontend_url = "https://neighborhue-frontend.vercel.app";
//http://localhost:3000

app.use(express.json());

app.use(cors({
  origin: "https://neighborhue-frontend.vercel.app",
  methods: ["GET,PUT,PATCH,POST,DELETE"],
  credentials: true,
  // preflightContinue: true,
}));


app.options('*', cors());

// app.use(cors());

app.use(
  cookieSession({
    name: "session",
    keys: ["neighborhue-cookie"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());






// Using routes

app.use("/api/ai-chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/auth", authRouter);
app.use("/register", userRouter);
app.use("/api/payment", paymentRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});


