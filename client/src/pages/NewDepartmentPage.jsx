import React from 'react'
import Nav from '../components/Nav'
import { Title } from '../components/Headers/Title'
import flechaAtras from '../img/flechaAtras.png'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDepartment} from '../context/DepartmentContext'
import { useNavigate } from "react-router-dom";

function NewDepartmentPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const {createDepartment, errors:signinErrors} = useDepartment()

      const onSubmit = handleSubmit(async (values) => {
        createDepartment(values)
        navigate('/departamentos')
      })
  return (
    <>
      <Nav>
        <Title>Agregar Dpto.</Title>

        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/departamentos">
              <img
                src={flechaAtras}
                className="size-8 max-[281px]:size-6"
                alt=""
              />
            </Link>
          </button>
        </div>

        <div className=" flex h-auto items-center p-5 justify-center">
          <div className="bg-white max-w-lg w-full p-8 rounded text-center shadow-xl">
            <form className="flex flex-col items-center" onSubmit={onSubmit}>
              <img
                className="w-20 p-1"
                src="LogoMahekal.png"
                alt="Mahekal Logo"
              />
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
                {...register("name", { required: true })}
                placeholder="Nombre del dpto"
              />
              {errors.name && (
                <p className="text-red-500">El Nombre es requerido*</p>
              )}
              <button
                className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover"
                type="submit"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </Nav>
    </>
  );
}

export default NewDepartmentPage