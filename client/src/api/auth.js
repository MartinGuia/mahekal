import axios from './axios'



export const registerRequest = (user) => axios.post(`/signup`, user);

export const loginRequest = (user) => axios.post(`/signin`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

// export const registerRequest = (user) => axios.post(`/signup`, user);
