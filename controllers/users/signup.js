const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const SignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${user.email} in use`);
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href ="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
    };
    await sendEmail(mail);

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
