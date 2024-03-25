import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutToken, getRoleRequest } from "../api/auth";
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'

// se crea una constante en la cual se guarda la ejecucion de createContext
export const AuthContext = createContext()

// en esta variable se recibe un contexto y lo guarda para que asi en el if pueda ser validado
export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context){
        throw new Error ("useAuth must be used within an AuthProvider") 
    }
    return context;
} 

// Recibe un elemento hijo de tipo objeto que son las funciones que se guardaran y ejecutara lo que este dentro de el
export const AuthProvider = ({children})=>{
  // usuario que sera leido en toda la aplicacion
  const [user, setUser] = useState(null);
  //   state para guardar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null)
  // const [getAllRoles, setGetAllRoles] = useState([])
  const [roleAdmin, setRoleAdmin] = useState([])
  const [roleManager, setRoleManager] = useState()
  const [roleChiefArea, setRoleChiefArea] = useState()
  const [roleOperator, setRoleOperator] = useState()
  // Funcion para registrar usuario y todo lo que este dentro de las etiquetas
  // AuthContext.Provider prodra usarlo
  const signupUser = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      console.log(user);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response);
      setErrors(error.response.data);
      console.log(error.response);
    }
  };
  function recargarPagina() {
    window.location.reload(); // Recarga la página
  }
  const signinUser = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
      recargarPagina()
      console.log(res);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        // console.log(error.response.data);
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getRole = async () => {
    try {
      const res = await getRoleRequest();
      // console.log(res.data);
      return res.data; 
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getRoleRequest();
  //     if (res) {
  //       setRoleAdmin(res.data[0]._id)
  //       setRoleManager(res.data[3]._id)
  //       setRoleChiefArea(res.data[2]._id)
  //       setRoleOperator(res.data[1]._id)
  //       console.log(res.data[1]);
  //       // setNombreUsuario(datosTicket.userFound.name);
  //       // setLastnameUsuario(datosTicket.userFound.lastname);
  //       // setDepartamentos(datosTicket.departments);
  //       // departamentos.map((option) => ({
  //       //   value: option.id,
  //       //   label: option.name, // Utilizar el valor 'name' como label en las opciones
  //       // }));
  //     }
  //   };

  //   fetchData();
  // }, []);

  const logout = async () => {
    await logoutToken();
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      setRole(cookies.token)
      // se comprueba si no hay token
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        //*Si hay token se envia al back
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        //*Si hay token autentica
        setIsAuthenticated(true);
        //*Muestrame el estado y mandalo al estado
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signinUser,
        signupUser,
        loading,
        getRole,
        roleAdmin,
        roleManager,
        roleChiefArea,
        roleOperator,
        role,
        user,
        isAuthenticated,
        errors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

