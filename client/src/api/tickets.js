import axios from './axios'

export const registerTicket = (ticket) => axios.post('/tickets/add-ticket', ticket)
export const getTicket = () => axios.get('/tickets/add-ticket')
