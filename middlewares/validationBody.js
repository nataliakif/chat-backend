const { BadRequest } = require("http-errors");

const validationBody = (schema) => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequest(` ${error} field`));
    }
    next();
  };
  return func;
};

module.exports = validationBody;
