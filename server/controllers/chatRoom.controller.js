const ChatroomModel = require("../models/roomchat.model");
const responseHandler = require("../handlers/response.handler");
const UserModel = require("../models/user.model");


//create room chat
exports.createRoomChat = async (req, res) => {
  try {
    const chatRoom = new ChatroomModel({});
    await chatRoom.save();
    return responseHandler.created(res, chatRoom);
  } catch (error) {
    responseHandler.error(res);
  }
};

//find room chat by id
exports.chatRoomById = async (req, res) => {
  try {
    // console.log(req.body);
    const id = req.query.roomId;
    const chatRoom = await ChatroomModel.findOne({ _id: id });
    return responseHandler.created(res, chatRoom);
  } catch (error) {
    return responseHandler.error(res);
  }
};

//add message to room chat
exports.addMessage = async (req, res) => {
  try {
    const { message, roomId, is_admin } = req.body;

    await ChatroomModel.updateOne(
      //push new messafge và is_admin 
      { _id: roomId },
      { $push: { content: { message, is_admin } } }
    );

    return responseHandler.success(res);
  } catch (error) {
    return responseHandler.error(res);
  }
};

//all cha room
exports.allChatRooms = async (req, res) => {
  try {
   // console.log("all");
    const chatRooms = await ChatroomModel.find({});
    return responseHandler.created(res, chatRooms);
  } catch (error) {
    return responseHandler.error(res);
  }
};
