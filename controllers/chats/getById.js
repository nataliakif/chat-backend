const { Chat } = require("../../models/chat");
const { NotFound } = require("http-errors");

const getChatById = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { _id: owner } = req.user;

    const result = await Chat.findOne({ _id: chatId, owner });

    if (!result) {
      throw new NotFound(`Chat with id ${chatId} was not found`);
    }

    res.json({
      chat: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getChatById;
