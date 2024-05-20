import axiosClient from './axiosClient'

const approvalPersonApi = {
  addApproval: (data) => axiosClient.post(`api/person/approval`, data),
  addSigned: (data) => axiosClient.post(`api/person/signed`, data),
  rejectDocument: (data) => axiosClient.post(`api/person/reject`, data),
  tagCodeDocument: (id) => axiosClient.get(`api/person/tagcode-info/${id}`),
  forwardPerson: (data) => axiosClient.post(`api/person/forward`, data),
  sharePerson: (data) => axiosClient.post(`api/person/shared`, data),

}

export default approvalPersonApi