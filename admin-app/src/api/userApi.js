import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
  postLogin: (query) => {
    const url = `/users/login/admin${query}`;
    // console.log(url);
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
};

export default UserAPI;
