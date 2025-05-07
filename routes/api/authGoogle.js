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
    // Redirect to frontend after successful login
    res.redirect("https://chat070525-frontend.netlify.app/");
  }
);

module.exports = router;
