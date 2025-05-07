const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const chatsRouter = require("./routes/api/chats");
const authRouter = require("./routes/api/users");
const googleAuthRouter = require("./routes/api/authGoogle");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api/users", authRouter);
app.use("/api/chats", chatsRouter);

// Google OAuth routes
app.use("/auth", googleAuthRouter);

// Current user route
app.get("/api/me", (req, res) => {
  console.log("CHECK SESSION:", req.session);
  console.log("CHECK USER:", req.user);
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});
app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000"); // возвращаемся на фронтенд
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

module.exports = app;
