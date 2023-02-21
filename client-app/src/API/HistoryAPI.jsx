import axiosClient from './axiosClient';

const HistoryAPI = {
	getHistoryAPI: (query) => {
		console.log(query);
		const url = `/histories${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `/histories/${id}`;
		return axiosClient.get(url);
	},
};

export default HistoryAPI;
