import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import ButtonAction from '../components/ui/ButtonAction';
import {useDepartment} from '../context/DepartmentContext'
import { useEffect, useState } from 'react';
import logo from '../img/LogoMahekal.png'
import Modal from '../components/ui/Modal';
import {useForm} from 'react-hook-form';

function DepartamentosPage() {
const {department, getAllDepartments} = useDepartment()

function recargarPagina() {
  window.location.reload(); // Recarga la página
}

  useEffect(()=>{
    getAllDepartments();
  },[])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {createDepartment, errors:signinErrors} = useDepartment()

  const onSubmit = handleSubmit(async (values) => {
    createDepartment(values)
    handleCloseModal()
    recargarPagina()
  })
  return (
    <>
      <Nav>
        <Title>Departamentos</Title>
        <section className="w-[100%] h-[8%] flex max-[541px]:mt-4">
          <div className="w-[100%]">
            <button
              onClick={handleOpenModal}
              className="bg-water-blue hover:bg-water-blue-hover px-4 py-3 rounded-lg shadow-lg ml-8"
            >
              Agregar Departamento
            </button>
          </div>
        </section>

        <section className="h-screen mt-8 flex items-center flex-col">
          <div className="h-[100%] w-[100%] flex items-center flex-col">
            {department.map((option, i) => (
              <Tarjeta to={`/listadptocollabs/${option.id}`} key={i}>
                <div className="w-[60%] flex justify-center items-center max-[541px]:w-[100%]">
                  <h1 className="text-3xl font-semibold max-[769px]:text-xl max-[376px]:text-base">
                    {option.name}
                  </h1>
                </div>
                <div className="w-[60%] flex justify-center items-center max-[541px]:w-[100%] max-[541px]:mt-2 max-[281px]:flex-col">
                  <div className="w-[100%] flex justify-center items-center mx-1">
                    <ButtonAction
                      rutaDestino={`/ticketsbydepartment/${option.id}`}
                      className="bg-water-blue hover:bg-water-blue-hover max-[541px]:w-auto flex-col items-center w-56"
                    >
                      <p className="text-xl text-center max-[769px]:text-base max-[431px]:text-sm max-[376px]:text-xs text-white">
                        Tickets
                      </p>
                      <span className="text-white">0</span>
                    </ButtonAction>
                  </div>
                </div>
              </Tarjeta>
            ))}
          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="relative bg-white rounded-lg">
            <Title>MAHEKAL</Title>

            <form className="flex flex-col items-center" onSubmit={onSubmit}>
              <img className="w-20 p-1" src={logo} alt="Mahekal Logo" />
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
        </Modal>
      </Nav>
    </>
  );
}

export default DepartamentosPage;