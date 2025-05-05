const { Chat } = require("../../models/chat");
const { NotFound } = require("http-errors");

const deleteChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    console.log(`Deleting chat with id: ${chatId}`);
    const result = await Chat.findByIdAndRemove(chatId);

    if (!result) {
      throw new NotFound(`Chat with id ${chatId} was not found`);
    }

    res
      .status(204)
      .json({ message: `Chat with id ${chatId} has been deleted`, result });
  } catch (error) {
    res.status(500).json({ error: error.message }); // исправлено .massage → .message
  }
};

module.exports = deleteChat;
