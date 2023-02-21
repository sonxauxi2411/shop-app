const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

//error handler
const error = (res) =>
  responseWithData(res, 500, { message: "Something wrong" });

//badrequest handler
const badrequest = async (res, message) =>
  responseWithData(res, 400, { status: 400, message });

//create handler
const created = async (res, data) => responseWithData(res, 201, data);

//notfound
const notfound = async (res, message) =>
  responseWithData(res, 404, { status: 404, message: "Not found" });

//authoriz handler
const unauthorize = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unathorized",
  });

//success handler
const success = (res) =>
  responseWithData(res, 200, { status: 200, message: "success" });

module.exports = { error, badrequest, created, notfound, unauthorize, success };
