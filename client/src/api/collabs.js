import axios from './axios'

export const getUsers = () => axios.get ('/users/get-allUsers')
export const getSignup = () => axios.get('/auth/signup')