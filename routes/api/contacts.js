const express = require("express");
const ctrl = require("../../controllers/contacts/");
const auth = require("../../middlewares/auth");
const { joiSchema, joiPatchFavoriteSchema } = require("../../models/contact");
const validateBody = require("../../middlewares/validationBody");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, validateBody(joiSchema), ctrl.addContact);

router.put("/:contactId", validateBody(joiSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(joiPatchFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
