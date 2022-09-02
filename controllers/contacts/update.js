const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) {
      console.log(result);
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
