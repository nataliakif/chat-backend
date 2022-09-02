const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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
};
module.exports = login;
