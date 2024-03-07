import { createContext, useState, useContext, useEffect} from "react";
import {createDepartmentRequest,getAllDepartmentsRequest, getAllCollabsOfDepartmentsRequest} from '../api/departments'


export const DepartmentContext = createContext()

export const useDepartment = () =>{
    const context = useContext(DepartmentContext)
    if(!context){
        throw new Error("useAuth must be used within an DepartmentProvider")
    }
    return context;
}

export const DepartmentProvider = ({children})=>{
  const [department, setDepartment] = useState([]);
  const [list, setList] = useState();
  const [errors, setErrors] = useState([]);

  const createDepartment = async (department) => {
    const res = await createDepartmentRequest(department);
    console.log(res);
  };

  const getAllDepartments = async () => {
    try {
      const res = await getAllDepartmentsRequest();
      setDepartment(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCollabsOfDepartments = async (id) => {
    try {
      const res = await getAllCollabsOfDepartmentsRequest(id);
      return res.data;
    } catch (error) {
      console.error("error when obtaining department data", error);
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
    <DepartmentContext.Provider
      value={{
        createDepartment,
        getAllDepartments,
        getAllCollabsOfDepartments,
        errors,
        department,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}