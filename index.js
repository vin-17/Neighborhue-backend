import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import dotenv from 'dotenv';
dotenv.config();
connectDB();

const PORT = 5000;

app.listen(PORT, () => {
    console.log("\n----------------------------------------------------------------------------------");
    console.log(
        `Server is working on port:${PORT} in ${process.env.NODE_ENV} Mode`
    );
    console.log("----------------------------------------------------------------------------------\n");
});

