const sendMail = require("../utils/mailer");
const CartModel = require("../models/cart.model");
const responseHandler = require("../handlers/response.handler");
const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");

//hàm chuyển đổi vnd
const convertMoney = (money) => {
  const str = money + "";
  let output = "";

  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    count++;
    output = str[i] + output;

    if (count % 3 === 0 && i !== 0) {
      output = "." + output;
      count = 0;
    }
  }

  return output;
};
//send Mail
exports.sendMail = async (req, res) => {
  try {
    // console.log(req.query);
    //nhận query
    const { address, fullname, phone, to } = req.query;
    const userId = req.query.idUser;
    //tìm cart theo userId
    const cart = await CartModel.findOne({
      userId: userId,
    });
    // console.log(cart);
    const subject = "thank you for your order";
    //header mail
    const htmlHeader =
      '<table style="width:50%">' +
      '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

    let htmlContent = "";
    //htmlContent (thông tin đơn hàng đã order)
    cart.cart.items.map((item) => {
      htmlContent +=
        "<tr>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        item.name +
        "</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
        item.image +
        '" width="80" height="80"></td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        convertMoney(item.price) +
        "VND</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        item.quantity +
        "</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        convertMoney(parseInt(item.price) * parseInt(item.quantity)) +
        "VND</td><tr>";
    });
    //tổng tiền
    const total = cart.cart.items.reduce((a, b) => a + b.price * b.quantity, 0);
    //kết hợp htmlHeader + htmlContent
    const htmlResult = `<h1>Xin Chào ${fullname}</h1> 
                            <h3>phone: ${phone}</h3> 
                            <h3>Address: ${address}</h3>
                            <div style='width:100%'>
                                ${htmlHeader}
                                ${htmlContent}
                            </div>
                            <h3>Tổng Thanh Toán: ${convertMoney(total)} VND</h3>
                            <p>Cảm ơn bạn!</p> `;

    //send mail
    await sendMail(to, subject, htmlResult);

    //----------------chuyển sang order và xoá cart khi senMail thành công---------------------------------//
    //lấy newCart
    const newCart = await cart.cart.items.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      };
    });
    //add vào order
    const order = new OrderModel({
      user: {
        userId: userId,
        address: address,
        fullname: fullname,
        phone: phone,
        email: to,
        total: total,
      },
      products: newCart,
    });
    //save
    await order.save();

    //------------update products trừ count  ---------------------------------//
    newCart.forEach(async (item) => {
      const { productId, quantity } = item;
      const product = await ProductModel.findById(productId);
      product.count -= quantity;
      await product.save();
    });
    //delete cart userId
    await CartModel.deleteMany({ userId: userId });

    return responseHandler.success(res);
  } catch (error) {
    responseHandler.error(res);
  }
};
