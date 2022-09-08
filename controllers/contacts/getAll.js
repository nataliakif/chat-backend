const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    });
    if (!contacts) {
      throw new NotFound(`Not found`);
    }
    res.json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
