import axiosClient from './axiosClient'

const approvalPersonApi = {
  addApproval: (data) => axiosClient.post(`api/person/approval`, data),
  addSigned: (data) => axiosClient.post(`api/person/signed`, data),
  rejectDocument: (data) => axiosClient.post(`api/person/reject`, data),
  tagCodeDocument: (id) => axiosClient.get(`api/person/tagcode-info/${id}`),
}

export default approvalPersonApi