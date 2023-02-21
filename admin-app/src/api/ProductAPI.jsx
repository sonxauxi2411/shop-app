import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
  addProduct: (data) => {
    //console.log(data);
    const url = "/products/add";
    return axiosClient.post(url, data);
  },
  updateProduct: (query, data) => {
    const url = `/products/update/${query}`;
    return axiosClient.put(url, data);
  },
  deleteProduct: (query) => {
    const url = `/products/delete/${query}`;
    return axiosClient.delete(url);
  },
};

export default ProductAPI;
