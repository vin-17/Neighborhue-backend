import express from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();

const CLIENT_URL = `${process.env.FRONTEND_URL}`;

router.get("/login/success", (req, res) => {
  if (req.user.user) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Respond with success JSON
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  } else {
    // Respond with unauthorized status if user is not logged in
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
});
  
//login fail
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});


//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", {scope : ["profile"]}));

router.post("/google/verify", (req, res) => {
    const { tokenId } = req.body;
  
    res.json({ message: 'Token verification successful' });
  });

router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
    );


export default router;
