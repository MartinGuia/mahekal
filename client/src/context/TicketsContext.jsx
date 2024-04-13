import { createContext, useState, useContext, useEffect} from "react";
import {
  registerTicket,
  getDataTicketRequest,
  getAllTicketsRequest,
  getTicketByIdRequest,
  getAllTicketsInProgressRequest,
  getAllTicketsInRevisionRequest,
  getAllTicketsNewsRequest,
  getAllTicketsResolveRequest,
  updateTicketRequest,
} from "../api/tickets";

export const TicketContext = createContext()

export const useTicket = () =>{
    const context = useContext(TicketContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider") 
    }
    return context;
} 

export const TicketProvider = ({children})=>{
  const [ticket, setTicket] = useState([]);
  const [errors, setErrors] = useState([]);
  const [ticketInProgress, setTicketInProgress] =useState([])
  const [tickestNews, setTicketsNews] =useState([])
  const [ticketsResolves, setTicketsResolves] =useState([])
  const [ticketsInRevision, setTicketsInRevision] =useState([])

  const signupTicket = async (ticket) => {
    const res = await registerTicket(ticket);
  };

  const updateTicket = async(id, ticket)=>{
    try {
    await updateTicketRequest(id, ticket)

    } catch (error) {
      console.error(error)
    }
  }

  const getTickets = async () => {
    try {
      const res = await getAllTicketsRequest();
      setTicket(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDatosTicket = async () => {
    try {
      const response = await getDataTicketRequest();
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del ticket:", error);
      return null;
    }
  };

  const getTicketById = async (id) => {
    try {
      const res = await getTicketByIdRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTicketsInProgress = async () =>{
    try {
      const res = await getAllTicketsInProgressRequest()
      setTicketInProgress(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  const getAllTicketsNews = async () =>{
    try {
      const res = await getAllTicketsNewsRequest()
      setTicketsNews(res.data)      
    } catch (error) {
      console.error(error);
    }
  }
  const getAllTicketsInRevision = async () =>{
    try {
      const res = await getAllTicketsInRevisionRequest()
      setTicketsInRevision(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  const getAllTicketsResolve = async () =>{
    try {
      const res = await getAllTicketsResolveRequest()
      setTicketsResolves(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <TicketContext.Provider
      value={{
        signupTicket,
        obtenerDatosTicket,
        getTicketById,
        getTickets,
        updateTicket,
        getAllTicketsInProgress,
        getAllTicketsNews,
        getAllTicketsResolve,
        getAllTicketsInRevision,
        errors,
        ticket,
        ticketInProgress,
        tickestNews,
        ticketsInRevision,
        ticketsResolves,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}