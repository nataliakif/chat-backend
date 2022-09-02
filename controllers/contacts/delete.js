const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    console.log(contactId);
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res
      .status(204)
      .json({ message: `User with id ${contactId} has been deleted`, result });
  } catch (error) {
    res.json({ error: error.massage });
  }
};

module.exports = deleteContact;
