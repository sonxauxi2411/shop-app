const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const isAuth = require("../middlewares/isAuth");
//add to cart
router.post("/add", cartController.postCart);
//update cart
router.put("/update", cartController.updateCart);
//delete cart
router.delete("/delete", cartController.deleteCart);
//get cart
router.get("/", cartController.getCart);
module.exports = router;
