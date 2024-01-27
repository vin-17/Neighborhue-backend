import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

app.use(cors({
    origin: "https://neighborhue-frontend.vercel.app",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));




connectDB();
const PORT = 5000;

app.get('/', function(req, res) {
    res.send('Hello, World!');
  });

app.listen(PORT, () => {
    console.log("\n----------------------------------------------------------------------------------");
    console.log(
        `Server is working on port:${PORT} in ${process.env.NODE_ENV} Mode`
    );
    console.log("----------------------------------------------------------------------------------\n");
});

