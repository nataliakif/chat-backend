const express = require("express");
const ctrl = require("../../controllers/chats");
const auth = require("../../middlewares/auth");
const { joiChatSchema, joiMessageSchema } = require("../../models/chat");

const validateBody = require("../../middlewares/validationBody");

const router = express.Router();

// Get all chats for the logged-in user
router.get("/", auth, ctrl.getAllChats);

// Get a specific chat by ID
router.get("/:chatId", auth, ctrl.getChatById);

// Create a new chat (requires firstName and lastName)
router.post("/", auth, validateBody(joiChatSchema), ctrl.addChat);

// Add a message to a specific chat (with auto bot response)
router.post(
  "/:chatId/messages",
  auth,
  validateBody(joiMessageSchema),
  ctrl.addMessageToChat
);

// Delete a chat by ID
router.delete("/:chatId", auth, ctrl.deleteChat);

module.exports = router;
