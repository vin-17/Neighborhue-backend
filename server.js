import { app } from "./app.js";
import dotenv from 'dotenv';

// import { connectDB } from "./data/database.js";

// connectDB();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("----------------------------------------------------------------------------------");
    console.log(
        `\nServer is working on port:${PORT} in ${process.env.NODE_ENV} Mode`
    );
    console.log("\n----------------------------------------------------------------------------------");
});