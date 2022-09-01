const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const updateContact = require("./update");
const updateFavorite = require("./updateFavorite");
const deleteContact = require("./delete");

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  updateFavorite,
  deleteContact,
};
