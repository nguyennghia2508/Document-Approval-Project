import axiosClient from './axiosClient'

const commentApi = {

    addComment: (data) => axiosClient.post(`api/comment/add`, data),
}

export default commentApi      