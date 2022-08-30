const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");

const {
  Contact,
  joiSchema,
  joiPatchFavoriteSchema,
} = require("../../models/contact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
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

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = joiSchema.validate(body);
    if (error) {
      throw new BadRequest(` ${error} field`);
    }
    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = joiSchema.validate(body);
    if (error) {
      throw new BadRequest(` ${error} field`);
    }
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
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = joiPatchFavoriteSchema.validate(body);
    if (error) {
      res.status(400).json("missing field favorite");
    }
    const result = Contact.findByIdAndUpdate(contactId, body);
    if (!result) {
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    console.log(contactId);
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      res.status(404).json(`User with id ${contactId} was not found`);
    }
    res
      .status(204)
      .json({ message: `User with id ${contactId} has been deleted`, result });
  } catch (error) {
    res.json({ error: error.massage });
  }
});

module.exports = router;
