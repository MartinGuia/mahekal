import { createContext, useState, useContext, useEffect} from "react";
import { getUsers,getSignup, getUserByIdToModifyRequest,updateUserRequest, getUserByIdRequest,updatePasswordUserRequest } from "../api/collabs";

export const CollabsContext = createContext()

export const useCollab = () =>{
    const context = useContext(CollabsContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider") 
    }
    return context;
} 

export const CollabsProvider = ({children})=>{
  const [errors, setErrors] = useState([]);
  const [options, setOptions] = useState([]);
  const [collabs, setCollabs] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const updateUser = async(id,user)=>{
    try {
    await updateUserRequest(id,user)
    } catch (error) {
      console.error(error)
    }
  }

  const updatePasswordUser = async(id,user)=>{
    try {
    await updatePasswordUserRequest(id,user)
    } catch (error) {
      console.error(error)
    }
  }

  // fetch para traer los datos en formularios
  const getDatos = async () => {
    const res = await getSignup();
    setOptions(res.data);
  };

  const getAllUsers = async () => {
    const res = await getUsers();
    setCollabs(res.data);
  };
  
  const getUserById = async (id) => {
    try {
      const res = await getUserByIdRequest(id);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getUserByIdToModify = async (id) => {
    try {
      const res = await getUserByIdToModifyRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CollabsContext.Provider
      value={{
        errors,
        options,
        getDatos,
        updateUser,
        updatePasswordUser,
        getUserById,
        getAllUsers,
        getUserByIdToModify,
        collabs,
      }}
    >
      {children}
    </CollabsContext.Provider>
  );
}