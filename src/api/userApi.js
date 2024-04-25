import axiosClient from './axiosClient'
const userApi = {
  getAll: () => axiosClient.get(`api/user/all`),

  addSignature: (id, data) => axiosClient.post(`api/user/add-signature/${id}`, data),
}

export default userApi