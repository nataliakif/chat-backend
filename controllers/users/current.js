const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    data: {
      user: { email, subscription },
    },
  });
};

module.exports = getCurrent;
