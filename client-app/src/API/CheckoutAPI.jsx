import axiosClient from './axiosClient';

const CheckoutAPI = {
	postEmail: (query) => {
		//console.log(query)
		const url = `/email${query}`;
		return axiosClient.post(url);
	},
};

export default CheckoutAPI;
