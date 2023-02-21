const responseHandler = require("../handlers/response.handler");

const isAuth = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return responseHandler.error(res);
  }
  next();
};

module.exports = isAuth;
