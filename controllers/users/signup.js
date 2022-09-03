const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models/user");

const SignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${user.email} in use`);
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      data: {
        avatarURL: newUser.avatarURL,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = SignUp;
