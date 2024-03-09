import React from 'react'
import Nav from '../components/Nav'
import Filter from '../components/ui/Filter'
import { Title } from '../components/Headers/Title'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDepartment } from '../context/DepartmentContext'
import ReturnButton from '../components/ui/ReturnButton'


function ListOfDeptCollabs() {
const { getAllCollabsOfDepartments} = useDepartment();
const [offline, setOfline] = useState([]);
const [online, setOnline] = useState([]);
const params = useParams()
const [openOn, setOpenOn] = useState(false);
const [countOn ,setCountOn] = useState ([])
const [countOff ,setCountOff] = useState ([])

const toggleOnline = () => {
  setOpenOn(!openOn);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const list = await getAllCollabsOfDepartments(params.id);
          if(list){
            setOnline(list.onlineColaborators)
            setOfline(list.offlineColaborators)
            setCountOn(list.onlineCount)
            setCountOff(list.offlineCount)
          }
        }
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };
  
    fetchData(); // Llamar a la función para obtener las opciones al montar el componente
  }, []);

  

  return (
    <>
      <Nav>
        <Title>Colaboradores</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/tickets">
              <ReturnButton/>
            </Link>
          </button>
        </div>

        {/* Seccion que contiene los filtros de los trabajadores */}
        <section className="justify-center mx-2 my-8 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
          <Filter>
              <button 
              onClick={toggleOnline}
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
            >
              {openOn ? 'Offline' : 'Online'}
              <br />
              {openOn ? (countOff) : (countOn) }
            </button>
          </Filter>
        </section>

        <section className={`w-[100%] flex justify-center ${
                openOn && "hidden"
              }`}>
          <table className="min-w-[70%] mt-4 divide-y divide-gray-200 shadow-lg max-w-[50%]">
            <thead className="bg-gray-50">
              <tr className='text-center'>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Última Conexión
                </th>
                <th scope="col" className="">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {online.map((person) => (
                <tr key={person.id}>
                  <td className=" whitespace-nowrap py-3">
                    <div className="text-sm font-medium text-gray-900 max-[391px]:text-xs">
                      {person.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(person.islogged =
                        "true"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800")}`}
                    >
                      {(person.status = "true" ? "Conectado" : "Desconectado")}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-500">
                    ---
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={`w-[100%] flex justify-center ${
                !openOn && "invisible"
              }`}>
          <table className="min-w-[70%] mt-4 divide-y divide-gray-200 shadow-lg max-w-[50%]">
            <thead className="bg-gray-50">
              <tr className="text-center">
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Última Conexión
                </th>
                <th scope="col" className="">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {offline.map((person) => (
                <tr key={person.id}>
                  <td className=" whitespace-nowrap py-3">
                    <div className="text-sm font-medium text-gray-900 max-[391px]:text-xs">
                      {person.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        person.status === "connected"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {person.status === "connected"
                        ? "Conectado"
                        : "Desconectado"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-500">
                    {person.lastSeen}
                  </td>
                  <td className="whitespace-nowrap text-sm font-medium">
                    <button
                      // onClick={() => handleDelete(person.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Nav>
    </>
  );
}

export default ListOfDeptCollabs