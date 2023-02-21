const router = require("express").Router();
const chatRoomController = require("../controllers/chatRoom.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/createNewRoom", chatRoomController.createRoomChat);

router.get("/getById", chatRoomController.chatRoomById);

router.put("/addMessage", chatRoomController.addMessage);

router.get("/", isAuth, chatRoomController.allChatRooms);

module.exports = router;
