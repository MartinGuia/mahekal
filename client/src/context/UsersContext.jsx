import { createContext, useState, useContext, useEffect} from "react";
import { getUsers,getSignup } from "../api/collabs";

export const CollabsContext = createContext()

export const useCollab = () =>{
    const context = useContext(CollabsContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider") 
    }
    return context;
} 

export const CollabsProvider = ({children})=>{
    const [errors, setErrors] = useState([])
    const [options, setOptions] = useState([]);
    const [collabs, setCollabs] = useState([]);
  
  
  useEffect(()=>{
      if (errors.length > 0){
          const timer = setTimeout(()=>{
              setErrors([])
          },3000)
          return() => clearTimeout(timer)
      }
  },[errors])
  
  // fetch para traer los datos en formularios
    const getDatos = async() =>{
      const res = await getSignup()
      setOptions(res.data)
    }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setCollabs(response.data); // Establecer las opciones obtenidas del backend
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };
  
    fetchData(); // Llamar a la función para obtener las opciones al montar el componente
  }, []);
  
    return (
      <CollabsContext.Provider
        value={{
          errors,
          options,
          getDatos,
          collabs,
        }}
      >
        {children}
      </CollabsContext.Provider>
    );
  }