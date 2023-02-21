const responseHandler = require("../handlers/response.handler");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

exports.postCart = async (req, res) => {
  try {
    const count = req.query.count;
    const productId = req.query.idProduct;
    const userId = req.query.idUser;
    const product = await ProductModel.findById(productId);
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      const cartNew = new CartModel({
        userId: userId,
      });
      cartNew.addToCart(product, count);
      responseHandler.success(res);
    } else {
      cart.addToCart(product, count);
      responseHandler.success(res);
    }
  } catch (error) {
    return responseHandler.error(res);
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.query.idUser;
    console.log(userId);
    const cart = await CartModel.findOne({ userId });
    console.log(cart);
    responseHandler.created(res, { cart: cart.cart.items, userId: userId });
  } catch (error) {
    responseHandler.error(res);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const userId = req.query.idUser;
    const count = req.query.count;
    const productId = req.query.idProduct;
    const cart = await CartModel.findOne({ userId });
    const product = cart.cart.items.find((item) => {
      return item.productId.toString() === productId.toString();
    });
    product.quantity = count;

    await cart.save();
  } catch (error) {
    return responseHandler.error(res);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { idUser, idProduct } = req.query;
    const cart = await CartModel.findOne({
      userId: idUser,
    });
    cart.deleteCart(idProduct);
    responseHandler.success(res);
  } catch (error) {
    return responseHandler.error(res);
  }
};
