const { Chat } = require("../../models/chat");

const updateChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const body = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, body, {
      new: true,
    });

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(updatedChat);
  } catch (error) {
    next(error);
  }
};

module.exports = updateChat;
