const express = require("express");
const ctrl = require("../../controllers/contacts/");
const auth = require("../../middlewares/auth");
const { joiSchema, joiPatchFavoriteSchema } = require("../../models/contact");
const validateBody = require("../../middlewares/validationBody");

const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
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
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", auth, validateBody(joiSchema), ctrl.addContact);

router.put("/:contactId", validateBody(joiSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(joiPatchFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
