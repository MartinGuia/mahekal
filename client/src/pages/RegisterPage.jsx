import { Title } from "../components/Headers/Title";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCollab } from "../context/UsersContext";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

  

function RegisterPage() {
    
    const {register, handleSubmit, formState:{
      errors,
    }} = useForm()
    const {options, getDatos} = useCollab()
    const { signupUser,errors: registerErrors} = useAuth()
  const navigate = useNavigate();

  useEffect(()=>{
    //Mapear los datos recibidos para crear un nuevo array con el formato adecuados
    getDatos(
      options.map((option) => ({
        value: option.value,
        label: option.name, // Utilizar el valor 'name' como label en las opciones
      }))
    );
    // options.map(option => ({
    //   value: option.value,
    //   label: option.name // Utilizar el valor 'name' como label en las opciones
    // }));
  },[options, getDatos])

  const onSubmit = handleSubmit(async (values) => {
    signupUser(values)
    navigate('/accounts')
  })

  return (
    <Nav>
       <div className=" flex h-auto items-center p-5 justify-center ">
        <div className="bg-white max-w-lg w-full p-8 rounded text-center shadow-xl">
          <Title>MAHEKAL</Title>

          <form
            className="flex flex-col items-center"
            onSubmit={onSubmit}
            // onSubmit={handleSubmit}
          >
            <img
              className="w-20 p-1"
              src="LogoMahekal.png"
              alt="Mahekal Logo"
            />
            {registerErrors.map((error, i) => (
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
              {...register("name", { required: true })}
              placeholder="Nombre"
              autoFocus
            />
            {errors.name && (
              <p className="text-red-500">El nombre es requerido*</p>
            )}
            <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="text"
              {...register("lastname", { required: true })}
              placeholder="Apellido"
            />
            {errors.lastname && (
              <p className="text-red-500">El Apellido es requerido*</p>
            )}
            <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="text"
              {...register("userName", { required: true })}
              placeholder="Username"
            />
            {errors.userName && (
              <p className="text-red-500">El Usuario es requerido*</p>
            )}
            <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
            />
            {errors.userName && (
              <p className="text-red-500">La contraseña es requerida*</p>
            )}
            <label htmlFor="">Rol:</label>
            <select
              className="w-[100%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              {...register("role", { required: true })}
            >
              <option>Selecciona una opccion . . .</option>
              <option value="Administrador">Administrador</option>
              <option value="Gerente Administrador">
                Gerente Administrador
              </option>
              <option value="Gerente Área">Gerente Área</option>
              <option value="Operador">Operador</option>
            </select>

            <label htmlFor="">Departamento:</label>
            <select
              className="w-[100%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              {...register("department", { required: true })}
              
            >
              <option>Selecciona una opccion . . .</option>
              {options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover"
              type="submit"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </Nav>
  );
}

export default RegisterPage;