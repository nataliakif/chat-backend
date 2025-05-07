const { Chat } = require("../../models/chat");
const axios = require("axios");
const { NotFound } = require("http-errors");

const addMessageToChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new NotFound(`Chat with id ${chatId} not found`);
    }

    // add msg from user
    const userMessage = {
      sender: "user",
      text,
      createdAt: new Date(),
    };
    chat.messages.push(userMessage);
    await chat.save();

    res.status(201).json({ message: "Message added", chat });

    // autoresponse in 3sec
    setTimeout(async () => {
      try {
        const response = await axios.get("https://zenquotes.io/api/random");
        const quote =
          response.data[0]?.q || "Sorry, no quote available right now.";

        const botMessage = {
          sender: "bot",
          text: quote,
          createdAt: new Date(),
        };
        chat.messages.push(botMessage);
        await chat.save();

        console.log(`Auto-response added to chat ${chatId}`);
      } catch (err) {
        console.error(
          "Failed to fetch quote or save auto-response:",
          err.message
        );
      }
    }, 3000);
  } catch (error) {
    next(error);
  }
};

module.exports = addMessageToChat;
