import axios from './axios'

export const registerTicket = (ticket) => axios.post('/tickets/add-ticket', ticket)
export const getAllTicketsRequest = () => axios.get('/tickets/tickets')
export const getTicketByIdRequest = (id) => axios.get(`/tickets/ticket/${id}`);
export const updateTicketRequest = (ticket) =>
  axios.put(`/tickets/reassignTicket/${ticket._id}`,ticket);

export const getDataTicketRequest = () => axios.get('/tickets/add-ticket')

export const getAllTicketsInProgressRequest = () =>
  axios.get("/tickets/progress-tickets");
export const getAllTicketsNewsRequest = () =>
  axios.get("/tickets/new-tickets");
export const getAllTicketsResolveRequest = () =>
  axios.get("/tickets/resolved");
export const getAllTicketsInRevisionRequest = () =>
  axios.get("/tickets/pause-or-review");