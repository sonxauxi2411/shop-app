const responseHandler = require("../handlers/response.handler");
const OrderModel = require("../models/order.model");

//lấy history(order) by userId
exports.getHistory = async (req, res) => {
  try {
    const userId = req.query.idUser;
    const orders = await OrderModel.find({ "user.userId": userId });
    const history = orders.map((item) => {
      return {
        _id: item._id,
        idUser: item.user.userId,
        fullname: item.user.fullname,
        phone: item.user.phone,
        address: item.user.address,
        total: item.user.total,
        delivery: false,
        status: false,
      };
    });
    return responseHandler.created(res, history);
  } catch (error) {
    return responseHandler.error(res, error);
  }
};
//lấy từ history(order) theo id
exports.getDetailedHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    return responseHandler.created(res, order);
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

//lấy all history(order)
exports.getAllHistory = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return responseHandler.created(res, orders);
  } catch (error) {
    return responseHandler.error(res);
  }
};

//title history dashboard
exports.getTitleHistory = async (req, res) => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          //tổng số tiền đã đặt và sl đơn hàng
          total: { $sum: "$user.total" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          count: 1,
        },
      },
    ]);
    const userOrder = await OrderModel.aggregate([
      {
        $group: {
          _id: "$user.userId",
        },
      },
      { //sl user đã đặt đơn hàng
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    const title = new Object({
      total: orders[0].total,
      count: orders[0].count,
      userOrder: userOrder[0].count,
    });

    return responseHandler.created(res, title);
  } catch (error) {
    return responseHandler.error(res);
  }
};
