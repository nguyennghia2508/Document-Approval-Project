import axiosClient from './axiosClient'

const documentApprovalApi = {

    getDocumentById: (id) => axiosClient.get(`api/documentapproval/view/${id}`),

    addDocumentApproval: (data) => axiosClient.post(`api/documentapproval/add`, data),

    getListDocument: ({ userId, tabName, page, dataFilter }) => axiosClient.post(`api/documentapproval/page/${page}`, { userId, tabName, dataFilter }),

    getAllListDocument: ({ userId, tabName, dataFilter }) => axiosClient.post(`api/documentapproval/all`, { userId, tabName, dataFilter }),

}

export default documentApprovalApi      