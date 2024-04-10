import axiosClient from './axiosClient'

const documentApprovalApi = {


    getDocumentById: (id, userId) => axiosClient.get(`api/documentapproval/view/${id}?v=${userId}`),

    addDocumentApproval: (data) => axiosClient.post(`api/documentapproval/add`, data),

    editDocumentApproval: (id, data) => axiosClient.post(`api/documentapproval/edit/${id}`, data),

    getEditDocumentById: (id, userId) => axiosClient.get(`api/documentapproval/edit/${id}?v=${userId}`),

    getListDocument: ({ userId, tabName, page, dataFilter }) => axiosClient.post(`api/documentapproval/page/${page}`, { userId, tabName, dataFilter }),

    getAllListDocument: ({ userId, tabName, dataFilter }) => axiosClient.post(`api/documentapproval/all`, { userId, tabName, dataFilter }),

}

export default documentApprovalApi      