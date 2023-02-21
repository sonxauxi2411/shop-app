import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ChatRoomsAPI from "../../api/ChatRoomsAPI";
import UserAPI from "../../api/userApi";
import { FaPaperPlane } from "react-icons/fa";
import "./chat.css";
import io from "socket.io-client";
const socket = io("https://universal-zigzag-crafter.glitch.me", {
  transports: ["websocket"],
});

function ChatRoom() {
  const [activeUser, setActiveUser] = useState(null);
  const [listUser, setListUser] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };
  const handlerUserId = async (value) => {
    setRoomId(value._id);
    setActiveUser(value._id);
  };

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoading(true);
    });
  }, []);

  const fetchUser = async () => {
    const response = await ChatRoomsAPI.allChatRooms();
    //  console.log(response);
    setListUser(response);
  };

  const fetchData = async () => {
    const response = await ChatRoomsAPI.getMessageByRoomId(roomId);
    setMessages(response.content);
  };
  useEffect(() => {
    if (loading) {
      fetchData();
      fetchUser();
      setLoading(false);
    }
  }, [loading]);

  // Hàm này dùng để load dữ liệu message của user khi user gửi tin nhán
  useEffect(() => {
    setLoading(true);
  }, [roomId]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoading(true);
    });
  }, []);

  const handlerSend = async (e) => {
    if (roomId && textMessage.toLowerCase() === "/end") {
      await ChatRoomsAPI.addMessage({
        message: "==END ROOM==",
        roomId: roomId,
        is_admin: true,
      });
      // localStorage.removeItem("njs_asm3_roomId");
      setTextMessage("");
      setRoomId("");
      setMessages([]);
      return;
    }
    const data = {
      message: textMessage,
      roomId: roomId,
      is_admin: true,
    };
    await ChatRoomsAPI.addMessage(data);
    setTextMessage("");

    setTimeout(() => {
      setLoading(true);
      socket.emit("send_message", data);
    }, 200);
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Chat
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Apps
                  </li>
                  <li
                    className="breadcrumb-item text-muted"
                    aria-current="page"
                  >
                    Chat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-lg-3 col-xl-2 border-end">
                  <div className="card-body border-bottom">
                    <form>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Contact"
                      />
                    </form>
                  </div>
                  <div
                    className="scrollable position-relative"
                    style={{ height: "calc(100vh - 111px)" }}
                  >
                    <ul className="mailbox list-unstyled">
                      <li>
                        <div className="message-center">
                          {listUser &&
                            listUser.map((value, index) => (
                              <a
                                key={value._id}
                                onClick={() => handlerUserId(value)}
                                className={`message-item d-flex align-items-center border-bottom px-3 py-2 active_user ${
                                  activeUser === value._id ? "active" : ""
                                } `}
                              >
                                <div className="user-img">
                                  {" "}
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="img-fluid rounded-circle"
                                    width="40px"
                                  />{" "}
                                  <span className="profile-status away float-right"></span>
                                </div>
                                <div className="w-75 d-inline-block v-middle pl-2">
                                  <h6 className="message-title mb-0 mt-1">
                                    {value._id}
                                  </h6>
                                </div>
                              </a>
                            ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9  col-xl-10">
                  <div
                    className="chat-box scrollable position-relative"
                    style={{ height: "calc(100vh - 111px)" }}
                  >
                    <ul className="chat-list list-style-none px-3 pt-3">
                      {messages &&
                        messages.map((value, index) =>
                          value.is_admin ? (
                            <div
                              className="media media-chat media-chat-reverse"
                              key={index}
                            >
                              <div className="media-body">
                                <p>You: {value.message}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="media media-chat" key={index}>
                              {" "}
                              <img
                                className="avatar"
                                src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                alt="..."
                              />
                              <div className="media-body" key={index}>
                                <p>Client: {value.message}</p>
                              </div>
                            </div>
                          )
                        )}
                    </ul>
                  </div>
                  <div className="card-body border-top">
                    <div className="row">
                      <div className="col-9">
                        <div className="input-field mt-0 mb-0">
                          <input
                            id="textarea1"
                            placeholder="Type and enter"
                            className="form-control border-0"
                            type="text"
                            onChange={onChangeText}
                            value={textMessage}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <a
                          className="btn-circle btn-lg btn-cyan float-right "
                          onClick={handlerSend}
                        >
                          <FaPaperPlane />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
