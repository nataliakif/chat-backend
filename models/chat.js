const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
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

const chatSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Chat = model("chat", chatSchema);

module.exports = { Chat };
