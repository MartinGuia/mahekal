import { createContext, useState, useContext, useEffect} from "react";
import {registerTicket, getTicket, getAllTickets} from "../api/tickets"

export const TicketContext = createContext()

export const useTicket = () =>{
    const context = useContext(TicketContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider") 
    }
    return context;
} 

export const TicketProvider = ({children})=>{
  const [ticket, setTicket] = useState(null);
  const [errors, setErrors] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  const signupTicket = async (ticket) => {
    const res = await registerTicket(ticket)
    console.log(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTickets();
        setAllTickets(response.data); // Establecer las opciones obtenidas del backend
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };
  
    fetchData(); // Llamar a la función para obtener las opciones al montar el componente
  }, []);
  
  const obtenerDatosTicket = async () => {
    try {
      const response = await getTicket();
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del ticket:', error);
      return null;
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
        getAllTickets,
        allTickets,
        errors,
        ticket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}