const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = Contact.findByIdAndUpdate(contactId, body);
    if (!result) {
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateFavorite;
