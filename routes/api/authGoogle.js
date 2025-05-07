const express = require("express");
const passport = require("passport");
const router = express.Router();

// Start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful login — redirect to frontend
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
