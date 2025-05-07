const express = require("express");
const passport = require("passport");
const router = express.Router();

// Запуск авторизации через Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback от Google после логина
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Успешный вход — перенаправляем на фронтенд
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
