import Nav from '../components/Nav'
import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { Link } from 'react-router-dom';
import { Title } from '../components/Headers/Title'
import { useForm } from "react-hook-form";
import { useTicket } from '../context/TicketsContext'
import { useState, useEffect } from 'react'
import axios from 'axios';


function NewTicketPage() {

  const {register, handleSubmit,formState:{
    errors,
  }} = useForm()
  const {obtenerDatosTicket, signupTicket, errors:registerErrors} = useTicket()
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [lastnameUsuario, setLastnameUsuario] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datosTicket = await obtenerDatosTicket();
      if (datosTicket) {
        setNombreUsuario(datosTicket.userFound.name);
        setLastnameUsuario(datosTicket.userFound.lastname)
        setDepartamentos(datosTicket.departments);
        departamentos.map((option) => ({
          value: option.id,
          label: option.name, // Utilizar el valor 'name' como label en las opciones
        }))
      }
    };

    fetchData();
  }, []);

  // const handlechange = e =>{
  //   e.preventDefault();

  //   console.log(e.target);
  // }

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signupTicket(data)
  })
  
  

  return (
    <>
      <Nav>
        {/* Caja que contiene el Titulo principal de la vista */}
        <Title>Nuevo Ticket</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/tickets">
              <img
                src="flechaAtras.png"
                className="size-8 max-[281px]:size-6"
                alt=""
              />
            </Link>
          </button>
        </div>

        {/* Seccion que contiene el formulario del ticket */}
        <section className="h-[100%] w-[100%] select-none">
          <form onSubmit={onSubmit} className="w-[100%] h-[100%]">
            {registerErrors.map((error, i) => (
              <div
                key={i}
                className="bg-red-500 text-white w-[100%] rounded-md py-1"
              >
                {error}
              </div>
            ))}
            <div className="flex w-[100%] max-[541px]:flex-col max-[541px]:items-center">
              {/* Caja del input para colocar el nombre */}
              <div className="w-[50%] flex justify-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex flex-col">
                  <label htmlFor="">Nombre</label>
                  <input
                    value={nombreUsuario + " " + lastnameUsuario}
                    readOnly
                    className="text-xl font-semibold border-2 rounded-md text-black p-2 m-2 w-[70%] max-[541px]:w-[100%]"
                    type="text"
                    {...register("name")}
                  />
                </div>
              </div>
              {/* Caja para el input de colocar el titulo del ticket */}
              <div className="w-[50%] flex justify-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex flex-col">
                  <label htmlFor="">Titulo ticket</label>
                  <input
                    type="text"
                    autoFocus
                    className="p-2 rounded m-2 border-2 w-[70%] max-[541px]:w-[100%]"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-red-500">El titulo es requerido*</p>
                  )}
                </div>
              </div>
            </div>
            {/* Caja para los inputs de seleccion de opciones */}
            <div className="w-[100%] flex max-[542px]:flex-col">
              {/* Caja de los componentes tipo input del lado izquierdo */}
              <div className="w-[50%] flex-col flex justify-center items-center max-[541px]:w-[100%]">
                <div className="w-[70%] flex-col max-[541px]:w-[100%] max-[541px]:items-center max-[541px]:flex">
                  <label htmlFor="">Prioridad:</label>
                  <select
                    className="w-[50%] text-base rounded-md block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 hover:focus:border-blue-500"
                    {...register("priority", { required: true })}
                  >
                    <option>Selecciona una opccion . . .</option>
                    <option value="Bajo">Bajo</option>
                    <option value="Medio">Medio</option>
                    <option value="Alto">Alto</option>
                    <option value="Critico">Critico</option>
                  </select>
                </div>
                {/* <div className="w-[70%] flex-col max-[541px]:w-[100%] max-[541px]:items-center max-[541px]:flex">
                  <label htmlFor="">Estado:</label>
                  <select
                    className="w-[50%] text-base rounded-md block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 hover:focus:border-blue-500"
                    {...register("status", { required: true })}
                  >
                    <option>Selecciona una opccion . . .</option>
                    <option value="En curso">En curso</option>
                    <option value="En pausa/revision">En pausa/revision</option>
                    <option value="Resuelto">Resuelto</option>
                  </select>
                </div> */}
              </div>
              {/* Caja de los componentes tipo input del lado derecho */}
              <div className="w-[50%] max-[541px]:w-[100%]">
                {/* Caja que contiene los inputs de asignar departamento y asignar persona */}
                <div className="w-auto flex-row flex justify-center items-center max-[281px]:flex-col">
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Departamento:</label>
                    <select
                      className="w-[70%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                      {...register("assignedDepartment", { required: true })}
                    >
                      <option>Selecciona una opccion...</option>
                      {departamentos.map((option, i) => (
                        <option key={i} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Asignar a:</label>
                    <select
                      className="w-[70%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                      name=""
                      id=""
                      {...register("assignedTo", { required: false })}
                    >
                      <option value="">Selecciona una opccion...</option>
                    </select>
                  </div> */}
                </div>
                {/* Caja que contiene los inputs del tiempo de ejecucion y el No. de habitación */}
                <div className="w-auto flex-row flex justify-center items-center max-[281px]:flex-col">
                  {/* <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">Tiempo de ejecución:</label>
                    <select
                      className="w-[70%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                      name=""
                      id=""
                      {...register("ejecutionTime", { required: false })}
                    >
                      <option value="">Selecciona una opccion</option>
                    </select>
                  </div> */}
                  <div className="w-[50%] max-[541px]:flex-col max-[541px]:flex max-[541px]:items-center max-[541px]:justify-center max-[281px]:w-[100%]">
                    <label htmlFor="">No. habitacion:</label>
                    <div className="max-[541px]:flex max-[541px]:justify-center">
                      <input
                        {...register("roomOrArea", { required: true })}
                        type="text"
                        className="p-1 rounded border-2 w-[70%] max-[281px]:w-[100%]"
                      />
                      
                    </div>
                    {errors.roomOrArea&& (
                        <p className="text-red-500">La habitacion o area es requerido/a*</p>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Caja que contiene el textarea*/}
            <div className=" w-[100%] mt-4">
              <div className="w-[50%] flex justify-center">
                <label htmlFor="" className="flex">
                  Descripcción del ticket
                </label>
              </div>
              <div className="flex w-[100%] justify-center">
                <textarea
                rows="3"
                placeholder='Describa el problema...'
                  {...register("description")}
                  className="w-[60%] pb-3 border-2 rounded-md"
                ></textarea>
              </div>
            </div>

            {/* Caja que contiene la insercion de imagenes */}
            <div className="flex justify-center mt-3">
              {/* <input  type="file" {...register("imageURL")}/> */}
              {/* <div
                {...getRootProps()}
                className="text-gray-400 border-2 py-[4%] px-[4%] border-dashed border-mahekal-brown cursor-pointer shadow-lg"
              >
                <input
                  {...getInputProps()}
                  {...register("imageURL", { required: false })}
                />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Arrastra o selecciona los archivos</p>
                )}
              </div>
              {/* <input type="file"
              onChange={e => setFile(e.target.files[0])}
            /> */}
              {/*Toma el objeto file y lo convierte a una url para mostrarlo como previsualizacion de la img escogida */}
              {/* {acceptedFiles[0] && (
                // <img
                //   src={URL.createObjectURL(acceptedFiles[0])}
                //   className="size-40"
                //   alt=""
                // />
              )} */} 
            </div>
            <br />
            <div className="w-[100%] flex justify-center">
              <button >enviar</button>
            </div>
          </form>
        </section>
      </Nav>
    </>
  );
}

export default NewTicketPage;