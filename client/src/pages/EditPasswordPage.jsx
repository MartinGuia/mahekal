import { useParams, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import logo from '../img/LogoMahekal.png'
import { useCollab } from '../context/UsersContext';
import { useEffect, useState } from 'react';
import { Title } from '../components/Headers/Title';
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import ReturnButton from '../components/ui/ReturnButton'

function EditPasswordPage() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    updatePasswordUser,
    errors: registerErrors,
  } = useCollab();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    updatePasswordUser(params.id, values);
    navigate('/accounts')
    console.log(values);
  });
  return (
    <>
    <Nav>
      <Title>Editar Contraseña</Title>
      {/* Caja que contiene el boton para regresar una pagina atras */}
      <div className="w-[9%] bottom-9 left-6 relative">
        <button className="rounded-full shadow-md">
          <Link to="/accounts">
            <ReturnButton />
          </Link>
        </button>
      </div>

      <div className=" flex h-auto items-center p-5 justify-center">
        <div className="bg-white max-w-lg w-full p-8 rounded text-center shadow-xl">
          <Title>MAHEKAL</Title>

          <form className="flex flex-col items-center" onSubmit={onSubmit}>
            <img className="w-20 p-1" src={logo} alt="Mahekal Logo" />
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
              {...register("password", { required: true })}
              placeholder='Contraseña'
              // defaultValue={getLastnameUser}
            />
            {errors.password && (
              <p className="text-red-500">El Apellido es requerido*</p>
            )}
            <button className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover">
              Actualizar contraseña
            </button>
          </form>
        </div>
      </div>
    </Nav>
  </>
  )
}

export default EditPasswordPage