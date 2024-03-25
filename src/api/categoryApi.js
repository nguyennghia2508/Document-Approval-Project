import axiosClient from './axiosClient'

const categoryApi = {
  getCategories : () => axiosClient.get(`api/document-type/all`),
}

export default categoryApi