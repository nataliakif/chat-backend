const { Schema, model } = require("mongoose");

const userSchema = Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatarURL: {
    type: String,
  },
});

const User = model("user", userSchema);

module.exports = { User };
