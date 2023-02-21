const UserModel = require("../models/user.model");
const responseHandler = require("../handlers/response.handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // console.log(req.query);

    const { fullname, email, password, phone } = req.query;
    //check user email
    const checkUser = await UserModel.findOne({ email });
    if (checkUser)
      //handler Password
      return responseHandler.badrequest(res, "email already exists");
    const handlerPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      fullname,
      email,
      password: handlerPassword,
      phone,
    });
    await user.save();
    responseHandler.created(res, { message: "User created successfully" });
  } catch (error) {
    return responseHandler.error(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.query;
    // console.log(req.query);
    const user = await UserModel.findOne({ email });
    if (!user) return responseHandler.badrequest(res, "User not found");
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return responseHandler.badrequest(res, "wrong password");
    if (user && isPassword) {
      req.session.isAuthenticated = true;
      // console.log("user_id", user._id);
      req.session.userId = user._id;
    }
    // console.log(req.session.isAuthenticated);
    // console.log("session.userId", req.session.userId);

    responseHandler.created(res, {
      session: req.sessionID,
      userId: user._id,
      fullname: user.fullname,
    });
  } catch (error) {
    return responseHandler.error(res);
  }
};

exports.logout = async (req, res) => {
  try {
    delete req.session.isAuthenticated;
    delete req.session.fullname;
    req.session.destroy();
    responseHandler.created(res, "logut success");
  } catch (error) {
    responseHandler.error(res);
  }
};

//all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    responseHandler.created(res, users);
  } catch (error) {
    responseHandler.error(res);
  }
};

//user Id
exports.getUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    const { password, ...order } = user._doc;
    // console.log(order);

    return responseHandler.created(res, order);
  } catch (error) {
    return responseHandler.error(res);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.query;

    const user = await UserModel.findOne({ email });
    if (!user) return responseHandler.badrequest(res, "User not found");
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return responseHandler.badrequest(res, "wrong password");
    if (user && isPassword) {
      req.session.isAuthenticated = true;
      req.session.userId = user._id;
    }
    // console.log(user.role);
    if (user.role !== "admin" && user.role !== "counselor")
      return responseHandler.badrequest(
        res,
        "you are not admin and not counselor"
      );

    responseHandler.created(res, {
      role: user.role,
      userId: user._id,
      fullname: user.fullname,
    });
  } catch (error) {
    return responseHandler.error(res);
  }
};
