import axiosClient from './axiosClient';

const authApi = {
  login: (params) => axiosClient.post('/api/user/login', params),
  verifyToken: () => axiosClient.post('api/user/verify-token'),
};

export default authApi;
