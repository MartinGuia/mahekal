import { Title } from "../components/Headers/Title";
import {useForm} from 'react-hook-form';
import { useAuth } from "../context/AuthContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signinUser, isAuthenticated, errors: signinErrors} = useAuth()

  const onSubmit = handleSubmit(data =>{
    signinUser(data)
  })
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuthenticated) navigate('/tickets')
  },[isAuthenticated])
  

  return (
    <>
    <div className=" flex h-[calc(100vh-100px)] items-center p-5 justify-center">
       <div className="bg-white max-w-lg w-full p-8 rounded text-center shadow-xl">
         <Title>MAHEKAL</Title>
         <form className="flex flex-col items-center" onSubmit={onSubmit}>
         
           <img className="w-20 p-1" src="LogoMahekal.png" alt="Mahekal Logo" />
           {signinErrors.map((error, i) => (
              <div
                key={i}
                className="bg-red-500 text-white w-[100%] rounded-md py-1"
              >
                {error}
              </div>
            ))}
           <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="text"
              {...register("userName", { required: true })}
              placeholder="Username"
            />
            {errors.userName && (
              <p className="text-red-500">
                El Usuario es requerido*
              </p>
            )}
           <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
            />
            {errors.userName && (
              <p className="text-red-500">
                La contraseña es requerida*
              </p>
            )}
           <button className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover" type="submit">
             Inicia sesion
           </button>
         </form>
       </div>
     </div>     
     </>
  );
}
