import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
  postLogin: (query) => {
    // console.log(query);
    const url = `/users/login${query}`;
    return axiosClient.post(url);
  },
  postLogout: () => {
    const url = `/users/logout`;
    return axiosClient.post(url);
  },
  getDetailData: (id) => {
    // console.log(id);
    const url = `/users/${id}`;
    return axiosClient.post(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
