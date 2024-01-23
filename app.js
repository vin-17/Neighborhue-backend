import express from "express";

export const app = express();

// Using Middlewares
app.use(express.json());


// Using routes


app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
