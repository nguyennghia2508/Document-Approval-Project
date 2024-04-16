import axiosClient from './axiosClient'

const fileUploadApi = {
    saveFileUpload: (documentData) => axiosClient.post(`api/pdf-viewers/SaveDocument`, documentData),
}

export default fileUploadApi