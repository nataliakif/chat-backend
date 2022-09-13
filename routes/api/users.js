const express = require("express");
const { auth, validationBody, upload } = require("../../middlewares/");
const ctrl = require("../../controllers/users");
const { joiSchema, joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validationBody(joiSchema), ctrl.signup);

router.post("/login", validationBody(joiSchema), ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);

router.patch(
  "/subscription",
  auth,
  validationBody(joiSubscriptionSchema),
  ctrl.subscription
);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
