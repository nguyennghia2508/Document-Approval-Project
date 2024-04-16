import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'https://localhost:44389';
const getToken = () => localStorage.getItem('token');

const axiosFileClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosFileClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            authorization: `Bearer ${getToken()}`,
        },
        responseType: 'blob',
    };
});

axiosFileClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        if (!err.response) {
            return alert(err);
        }
        throw err.response;
    }
);

export default axiosFileClient;