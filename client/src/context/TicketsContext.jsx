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

  const signupTicket = async (ticket) => {
    const res = await registerTicket(ticket);
    console.log(res);
  };

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
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTicketsInProgress = async () =>{
    try {
      const res = await getAllTicketsInProgressRequest()
      // setTicketInProgress(res.data)
      console.log(res.data);
      // return res.data
    } catch (error) {
      console.error(error);
    }
  }
  const getAllTicketsNews = async () =>{
    try {
      const res = await getAllTicketsNewsRequest()
      // setTicketInProgress(res.data)
      console.log(res.data);
      // return res.data
    } catch (error) {
      console.error(error);
    }
  }
  const getAllTicketsResolve = async () =>{
    try {
      const res = await getAllTicketsResolveRequest()
      // setTicketInProgress(res.data)
      console.log(res.data);
      // return res.data
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
        getAllTicketsInProgress,
        getAllTicketsNews,
        getAllTicketsResolve,
        errors,
        ticket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}