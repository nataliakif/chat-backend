const { Chat } = require("../../models/chat");

const addChat = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const ownerId = req.user?._id || null;
    const isDefault = !req.user; // 👈 если пользователь не залогинен → дефолтный чат

    const newChat = await Chat.create({
      firstName,
      lastName,
      owner: ownerId,
      isDefault,
      messages: [],
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error in addChat:", error.message);
    next(error);
  }
};

module.exports = addChat;
