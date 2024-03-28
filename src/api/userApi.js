import axiosClient from './axiosClient'
const userApi = {
  getAll: () => axiosClient.get(`api/user/all`),
}

export default userApi