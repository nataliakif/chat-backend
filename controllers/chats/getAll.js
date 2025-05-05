const { Chat } = require("../../models/chat");
const { NotFound } = require("http-errors");

const getAllChats = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const chats = await Chat.find({ owner }, "", {
      skip,
      limit: Number(limit),
    });

    if (!chats || chats.length === 0) {
      throw new NotFound("No chats found");
    }

    res.json({
      chats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllChats;
