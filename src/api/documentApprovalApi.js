import axiosClient from './axiosClient'

const documentApprovalApi = {
    addDocumentApproval : (data) => axiosClient.post(`api/documentapproval/add`,data),
}

export default documentApprovalApi