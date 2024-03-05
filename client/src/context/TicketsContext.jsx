import { createContext, useState, useContext, useEffect} from "react";
import {registerTicket, getDataTicketRequest, getAllTicketsRequest, getTicketByIdRequest} from "../api/tickets"

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

  const signupTicket = async (ticket) => {
    const res = await registerTicket(ticket);
    console.log(res);
  };

  const getTickets = async () => {
    try {
      const res = await getAllTicketsRequest();
    setTicket(res.data);
    } catch (error) {
      console.error(error)
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllTickets();
  //       setAllTickets(response.data); // Establecer las opciones obtenidas del backend
  //       // console.log(response.data);
  //     } catch (error) {
  //       console.error('Error al obtener opciones:', error);
  //     }
  //   };

  //   fetchData(); // Llamar a la función para obtener las opciones al montar el componente
  // }, []);

  const obtenerDatosTicket = async () => {
    try {
      const response = await getDataTicketRequest();
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del ticket:", error);
      return null;
    }
  };

  // const getTicketById = async (id) => {
  //   try {
  //     const response = await getTicketByIdRequest(id);
  //     setIdTicket(response.data)
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error al obtener datos del ticket:', error);
  //     return null;
  //   }
  // };

  const getTicketById = async (id) => {
    try {
      const res = await getTicketByIdRequest(id);
    return res.data
    // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
        errors,
        ticket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}