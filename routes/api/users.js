const express = require("express");
const jwt = require("jsonwebtoken");
const { Conflict, BadRequest, Unauthorized } = require("http-errors");
const { User, joiSchema, joiSubscriptionSchema } = require("../../models/user");
const auth = require("../../middlewares/auth");

const { SECRET_KEY } = process.env;

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(
        ` ${error} field Ошибка от Joi или другой библиотеки валидации`
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${user.email} in use`);
    }
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(
        ` ${error} field Ошибка от Joi или другой библиотеки валидации`
      );
    }
    const user = await User.findOne({ email });
    const passCompare = user.comparePassword(password);
    if (!user || !passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findOneAndUpdate({ email }, { token });
    res.status(201).json({
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", auth, async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    await User.findOneAndUpdate({ _id: id }, { token: null });
    res.status(204).json({
      message: "No Content",
    });
    res.status();
  } catch (error) {
    next(error);
  }
});

router.get("/current", auth, async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    data: {
      user: { email, subscription },
    },
  });
});

router.patch("/subscription", auth, async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const { subscription } = req.body;
    const { error } = joiSubscriptionSchema.validate(req.body);
    if (error) {
      res.status(400).json("missing field subscription");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    const result = await User.findByIdAndUpdate(
      { _id: id },
      { subscription },
      { new: true }
    );
    res.status(201).json({
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
