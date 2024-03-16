import axios from './axios'

export const createDepartmentRequest = (department) => axios.post('/departments/add-department', department)
export const getAllDepartmentsRequest = () => axios.get('/departments/alldepartments');
export const getAllCollabsOfDepartmentsRequest = (id) => axios.get(`/departments/colaborators-department/${id}`);