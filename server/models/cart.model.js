const mongoose = require("mongoose");

const CartShema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

//hàm add product to cart
CartShema.methods.addToCart = function (product, quantity) {
  //tìm product trong cart
  const cartItemIndex = this.cart.items.findIndex(
    (item) => item.productId.toString() === product._id.toString()
  );
  //quantity
  let newQuantity = 1;
  //cart items produts
  const updatedCartItems = [...this.cart.items];
  //nếu tìm thấy product
  if (cartItemIndex >= 0) {
    //cộng thêm quantity
    newQuantity = this.cart.items[cartItemIndex].quantity + parseInt(quantity);
    //update products
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    //ko tìm thấy product thì push product vào items
    updatedCartItems.push({
      productId: product._id,
      quantity: quantity,
      name: product.name,
      price: product.price,
      image: product.photos[0],
    });
  }
  const updatedCart = { items: updatedCartItems };

  //thay cart thành updatedCart
  this.cart = updatedCart;
  console.log(this);

  //save cart
  return this.save();
};
//delete product from cart
CartShema.methods.deleteCart = function (productId) {
  //filter cart voi productId
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;

  return this.save();
};

module.exports = mongoose.model("Cart", CartShema);
