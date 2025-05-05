const getAllChats = require("./getAll");
const getChatById = require("./getById");
const addChat = require("./add");
const deleteChat = require("./delete");
const addMessageToChat = require("./addMessage");

module.exports = {
  getAllChats,
  getChatById,
  addChat,
  deleteChat,
  addMessageToChat,
};
