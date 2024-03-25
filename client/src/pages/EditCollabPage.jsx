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
    getUserByIdToModify,
    updateUser,
    errors: registerErrors,
  } = useCollab();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [getDpto, setGetDpto] = useState({});
  const [getNameUser, setGetNameUser] = useState();
  const [getLastnameUser, setGetLastnameUser] = useState();
  const [getUserName, setGetUserName] = useState();
  const [getRoles, setGetRoles] = useState([]);
  const [getRole, setGetRole] = useState({});
  const [getAllDepartments, setGetAllDepartments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const userById = await getUserByIdToModify(params.id);
          setGetNameUser(userById.userFound.name);
          setGetLastnameUser(userById.userFound.lastname);
          setGetUserName(userById.userFound.userName);
          setGetRole(userById.userFound.role);
          console.log(userById.userFound.role);
          setGetDpto(userById.userFound.department);
          setGetRoles(userById.rolesList);
          getRoles.map((option) => ({
            value: option._id,
            label: option.name, // Utilizar el valor 'name' como label en las opciones
          }));
          setGetAllDepartments(userById.departmentList);
          getAllDepartments.map((option) => ({
            value: option.id,
            label: option.name, // Utilizar el valor 'name' como label en las opciones
          }));
      }
    };

    fetchData();
  }, []);

  const onSubmit = handleSubmit((values) => {
    updateUser(params.id, values);
    navigate('/accounts')
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
                {...register("name")}
                defaultValue={getNameUser}
                autoFocus
              />
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
                required
              >
                <option defaultValue={getRole._id} value={getRole._id} hidden>{getRole.name}</option>
                {getRoles.map((option, i) => (
                  <option key={i} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <label htmlFor="">Departamento:</label>
              <select
                className="w-[100%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                {...register("department")}
              >
                <option hidden value={getDpto.id}>{getDpto.name}</option>
                {getAllDepartments.map((option, i) => (
                  <option key={i} value={option.id}>
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