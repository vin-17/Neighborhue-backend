import express from "express";
import { register, getUser } from "../controller/user.js";

const router = express.Router();


router.post("/signin", register);
router.post("/getUser", getUser);


export default router;