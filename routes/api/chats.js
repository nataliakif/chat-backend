const express = require("express");
const ctrl = require("../../controllers/chats");

const router = express.Router();

router.get("/", ctrl.getAllChats);
router.get("/:chatId", ctrl.getChatById);
router.post("/", ctrl.addChat);
router.post("/:chatId/messages", ctrl.addMessageToChat);
router.delete("/:chatId", ctrl.deleteChat);
router.put("/:chatId", ctrl.updateChat);

module.exports = router;
