import axiosClient from './axiosClient'

const categoryApi = {
  getAllCategory: () => axiosClient.get(`api/document-type/all`),
}

export default categoryApi