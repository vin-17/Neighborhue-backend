import express from "express";
import { register } from "../controller/user.js";

const router = express.Router();


router.post("/signin", register);


export default router;