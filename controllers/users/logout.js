const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");

const logOut = async (req, res, next) => {
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
};
module.exports = logOut;
