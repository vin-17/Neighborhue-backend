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

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://neighborhue-frontend.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

// app.use(cors({
  //   origin: "https://neighborhue-frontend.vercel.app",
  //   methods: ["GET,PUT,PATCH,POST,DELETE"],
  //   credentials: true,
  //   // preflightContinue: true,
  // }));
  
  // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "https://neighborhue-frontend.vercel.app");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.options('*', cors());

// // app.use(cors());

// app.use(
  //   cookieSession({
    //     name: "session",
    //     keys: ["neighborhue-cookie"],
    //     maxAge: 24 * 60 * 60 * 100,
    //   })
    // );
    
// app.use(passport.initialize());
// app.use(passport.session());






// Using routes

app.use("/api/ai-chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/auth", authRouter);
app.use("/register", userRouter);
app.use("/api/payment", paymentRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});



// const frontend_url = "https://neighborhue-frontend.vercel.app";
//http://localhost:3000