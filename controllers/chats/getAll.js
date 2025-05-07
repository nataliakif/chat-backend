const { Chat } = require("../../models/chat");
const { NotFound } = require("http-errors");

const getAllChats = async (req, res, next) => {
  try {
    let chats;

    if (req.user) {
      chats = await Chat.find({
        $or: [{ owner: req.user._id }, { isDefault: true }],
      });
    } else {
      chats = await Chat.find({ isDefault: true });
    }

    if (!chats || chats.length === 0) {
      throw new NotFound("No chats found");
    }

    res.json({ chats });
  } catch (error) {
    console.error("Error in getAllChats:", error.message);
    next(error);
  }
};

module.exports = getAllChats;
