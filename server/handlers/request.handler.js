const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  //req error
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.array()[0].msg });
  }
  next();
};

module.exports = validate;
