import { useParams, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import logo from '../img/LogoMahekal.png'
import { useCollab } from '../context/UsersContext';
import { useEffect, useState } from 'react';
import { Title } from '../components/Headers/Title';
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import ReturnButton from '../components/ui/ReturnButton'

function EditCollabPage() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    options,
    getUserByIdToModify,
    updateUser,
    errors: registerErrors,
  } = useCollab();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getRole, setGetRole] = useState();
  const [getDpto, setGetDpto] = useState();
  const [getNameUser, setGetNameUser] = useState();
  const [getLastnameUser, setGetLastnameUser] = useState();
  const [getUserName, setGetUserName] = useState();

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const userById = await getUserByIdToModify(params.id);
          // console.log(userById);
          if (userById) {
            setGetNameUser(userById.userFound.name);
            setGetLastnameUser(userById.userFound.lastname);
            setGetUserName(userById.userFound.userName);
            setGetRole(userById.userFound.role.name);
            setGetDpto(userById.userFound.department.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);

  const onSubmit = handleSubmit((values) => {
    updateUser(params.id, values);
    console.log(values);
  });

  return (
    <>
      <Nav>
        <Title>Editar Usuario</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/accounts">
              <ReturnButton/>
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
                {...register("name")}
                defaultValue={getNameUser}
                autoFocus
              />
              <input {...register("id")} readOnly defaultValue={params.id} />
              {errors.name && (
                <p className="text-red-500">El nombre es requerido*</p>
              )}
              <input
                className="w-full bg-mahekal-input p-2 rounded m-2"
                type="text"
                {...register("lastname", { required: false })}
                defaultValue={getLastnameUser}
              />
              {errors.lastname && (
                <p className="text-red-500">El Apellido es requerido*</p>
              )}
              <input
                className="w-full bg-mahekal-input p-2 rounded m-2"
                type="text"
                {...register("userName", { required: false })}
                defaultValue={getUserName}
              />
              {errors.userName && (
                <p className="text-red-500">El Usuario es requerido*</p>
              )}
              <label htmlFor="">Rol:</label>
              <select
                className="w-[100%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                {...register("role")}
              >
                <option hidden>{getRole}</option>
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
                {...register("department")}
              >
                <option hidden>{getDpto}</option>
                {options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <button className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </Nav>
    </>
  );
}

export default EditCollabPage