const { Unauthorized } = require("http-errors");
const { User, joiSubscriptionSchema } = require("../../models/user");

const handleSubscription = async (req, res, next) => {
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
};
module.exports = handleSubscription;
