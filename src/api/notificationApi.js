import axiosClient from './axiosClient'
const notificationApi = {
    getNotificationById: (userId) => axiosClient.get(`api/notification/getNotificationBy/${userId}`),
    getAll: () => axiosClient.get(`api/notification/getAll`),


}
export default notificationApi