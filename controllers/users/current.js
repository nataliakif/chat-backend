const getCurrent = async (req, res, next) => {
  console.log(req.user);
  const { email, subscription, avatarURL } = req.user;
  res.json({
    data: {
      user: { email, subscription, avatarURL },
    },
  });
};

module.exports = getCurrent;
