import axiosClient from './axiosClient'

const departmentApi = {
  getAllDepartment: () => axiosClient.get(`api/department/all`),
}

export default departmentApi