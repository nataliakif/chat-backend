const { Schema, model } = require("mongoose");
const Joi = require("joi");

const messageSchema = Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Set first name for chat"],
  },
  lastName: {
    type: String,
    required: [true, "Set last name for chat"],
  },
  messages: [messageSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: false,
    default: null,
  },

  isDefault: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const joiChatSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const joiMessageSchema = Joi.object({
  text: Joi.string().required(),
  sender: Joi.string().valid("user", "bot").required(),
});

const Chat = model("chat", chatSchema);

module.exports = { Chat, joiChatSchema, joiMessageSchema };
