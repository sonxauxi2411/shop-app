const router = require("express").Router();
const mailController = require("../controllers/mail.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, mailController.sendMail);

module.exports = router;
