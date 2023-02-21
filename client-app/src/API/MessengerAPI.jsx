import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessage: (query) => {
    console.log(query);
    const url = `/messenger/${query}`;
    return axiosClient.get(url);
  },

  postMessage: (query) => {
    console.log("post", query);
    const url = `/messenger/send${query}`;
    return axiosClient.post(url);
  },

  postConversation: (query) => {
    console.log("post1", query);
    const url = `/messenger/conversation${query}`;
    return axiosClient.post(url);
  },
};

export default MessengerAPI;
