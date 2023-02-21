const router = require("express").Router();
const productController = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");

router.get("/", productController.getAllProducts);

router.get("/pagination", productController.getSearchProducts);

router.post("/add", isAuth, productController.addProduct);

router.put("/update/:id", isAuth, productController.updateProduct);

router.delete("/delete/:id", isAuth, productController.deleteProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
