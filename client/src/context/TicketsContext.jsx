import { createContext, useState, useContext, useEffect} from "react";
import {registerTicket, getTicket} from "../api/tickets"

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

  const signupTicket = async (ticket) => {
    const res = await registerTicket(ticket)
    console.log(res);
    // try {
    //   const res = await registerTicket(ticket);
    //   console.log(res.data);
    //   console.log(ticket);
    //   setTicket(res.data);
    // } catch (error) {
    //   setErrors(error.response.data);
    //   console.log(error.response);
    // }
  };
  
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
        errors,
        ticket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}