/*
Извлекает токен из заголовка и проверяет его на валидность, извлекает из токена id  и находит пользователя в базе
*/

const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized bearer");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
