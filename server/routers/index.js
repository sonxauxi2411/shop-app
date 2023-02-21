const router = require("express").Router();
const userRouter = require("./user.router");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const emailRouter = require("./email.router");
const historyRouter = require("./history.router");
const chatRoomRouter = require("./chatRoom.router");
const isAuth = require("../middlewares/isAuth");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/email", emailRouter);
router.use("/histories",isAuth, historyRouter);
router.use("/chatrooms", chatRoomRouter);

module.exports = router;
