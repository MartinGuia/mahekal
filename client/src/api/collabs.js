import axios from './axios'

export const getUsers = () => axios.get ('/users/get-allUsers')
export const getSignup = () => axios.get('/auth/signup')
export const getUserByIdRequest = (id) => axios.get(`/users/getUser/${id}`)
export const getUserByIdToModifyRequest = (id) => axios.get(`/users/getUserToModify/${id}`)
export const updateUserRequest = (id,user) =>
  axios.put(`/users/update-user/${id}`,user);