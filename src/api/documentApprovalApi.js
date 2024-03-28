import axiosClient from './axiosClient'

const documentApprovalApi = {

    addDocumentApproval : (data) => axiosClient.post(`api/documentapproval/add`,data),

    getListDocument: (page) => axiosClient.get(`api/documentapproval/page/${page}`)
}

export default documentApprovalApi