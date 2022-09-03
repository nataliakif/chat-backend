const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
