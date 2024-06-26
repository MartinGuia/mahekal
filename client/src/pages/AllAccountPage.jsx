import { Title } from '../components/Headers/Title';
import Nav from '../components/Nav'
import { useCollab } from '../context/UsersContext';
import { useEffect, useState } from 'react';
import Modal from '../components/ui/Modal';
import { useAuth } from "../context/AuthContext";
import {useForm} from 'react-hook-form'
import logo from '../img/LogoMahekal.png'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function AllAccountPage() {
  const {
    getAllUsers,
    collabs,
    options,
    getDatos,
  } = useCollab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditPassOpen, setIsModalEditPassOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signupUser, errors: registerErrors } = useAuth();

  function recargarPagina() {
    window.location.reload(); // Recarga la página
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = handleSubmit((values) => {
    signupUser(values);
    swal("Usuario Agregado", "","success");
    handleCloseModal();
  });

  useEffect(() => {
    //Mapear los datos recibidos para crear un nuevo array con el formato adecuados
    getDatos(
      options.map((option) => ({
        value: option.value,
        label: option.name, // Utilizar el valor 'name' como label en las opciones
      }))
    );
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Nav>
      <Title>Cuentas</Title>

      <section className="w-[100%] h-[8%] flex max-[541px]:mt-4">
        <div className="w-[100%]">
          <button
            onClick={handleOpenModal}
            className="bg-water-blue hover:bg-water-blue-hover px-4 py-3 rounded-lg shadow-lg ml-8"
          >
            Agregar colabolador
          </button>
        </div>
      </section>

      <div className="overflow-x-auto flex justify-center max-[542px]:block">
        <table className="w-[90%] bg-white shadow-md rounded-lg my-6">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Departamento</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {collabs.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 hover:-translate-y-1"
              >
                <Link className="flex" to={`/profile/${item.id}`}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.name}
                  </td>
                </Link>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.role}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.department}
                </td>
                <td className="py-3 px-6 text-center flex justify-evenly max-[541px]:block">
                  <button className="text-red-500 hover:text-red-700 mr-2 hover:-translate-y-1">
                    Eliminar
                  </button>
                  <Link to={`/edit-collab/${item.id}`}>
                    <button
                      // onClick={() => handleOpenModalEditData(item.id)}
                      className="text-blue-500 hover:text-blue-700 hover:-translate-y-1"
                    >
                      Editar
                    </button>
                  </Link>
                  <Link to={`/edit-password-collab/${item.id}`}>
                    <button
                      // onClick={() => handleEdit(index)}
                      // onClick={handleOpenModalEditPass}
                      className="text-green-500 hover:text-green-700 hover:-translate-y-1"
                    >
                      Editar contraseña
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* ventana modal de agregar colaborador */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="relative bg-white rounded-lg">
            <Title>MAHEKAL</Title>

            <form
              className="flex flex-col items-center"
              onSubmit={onSubmit}
              // onSubmit={handleSubmit}
            >
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
        </Modal>
      </div>
    </Nav>
  );
}

export default AllAccountPage