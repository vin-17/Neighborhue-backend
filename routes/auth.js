import express from "express";
import passport from "passport";



const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

// login success
router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
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
  
    // Perform verification of the tokenId (JWT) with Google here
    // You may use a library like 'google-auth-library' or 'jsonwebtoken' for this purpose
  
    // After verification, you can handle the user data and respond accordingly
    // For now, let's just respond with a success message
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