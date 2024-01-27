import express from "express";
import { Inquiry } from "../models/inquiry.js";


export const newInquiry = async (req, res) => {
    try {
      const { username, userEmail, problemDescription } = req.body;
  
      await Inquiry.create({
        username,
        userEmail,
        problemDescription,
      });
  
      res.status(201).json({
        success: true,
        message: "Inquiry sent Successfully",
      });
    } catch (error) {
        console.error("Error creating inquiry:", error);

        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
    }
  };

const router = express.Router();

router.post("/send-inquiry", newInquiry); //create task

export default router;



// router.get("/my", isAuthenticated, getMyTask); //all task

// router
//   .route("/:id")
//   .put(isAuthenticated, updateTask)
//   .delete(isAuthenticated, deleteTask);