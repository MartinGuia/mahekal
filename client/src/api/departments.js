import axios from './axios'

export const getAllDepartments = () => axios.get('/departaments/alldepartments');