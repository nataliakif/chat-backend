const { Chat } = require("../../models/chat");

const addChat = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const body = req.body;
    const newChat = await Chat.create({ ...body, owner: _id });
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

module.exports = addChat;
