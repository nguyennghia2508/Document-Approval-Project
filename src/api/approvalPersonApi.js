import axiosClient from './axiosClient'

const approvalPersonApi = {
  addApproval : (data) => axiosClient.post(`api/person/approval`,data),
  addSigned : (data) => axiosClient.post(`api/person/signed`,data),
  RejectDocument : (data) => axiosClient.post(`api/person/reject`,data),
}

export default approvalPersonApi