const userControllers = require("../controllers/user.controller");
const { body } = require("express-validator");
const validate = require("../handlers/request.handler");
const router = require("express").Router();
const UserModule = require("../models/user.model");
const isAuth = require("../middlewares/isAuth");

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

router.post("/login/admin", userControllers.loginAdmin);

router.post("/logout", userControllers.logout);

router.post("/:id", isAuth, userControllers.getUserId);

router.get("/", isAuth, userControllers.getAllUsers);

module.exports = router;
