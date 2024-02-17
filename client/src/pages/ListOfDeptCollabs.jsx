import React from 'react'
import Nav from '../components/Nav'
import Filter from '../components/ui/Filter'
import { Title } from '../components/Headers/Title'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function ListOfDeptCollabs() {

  const initialData = [
    {
      id: 1,
      name: "Martin Garcia",
      status: "connected",
      lastSeen: "2024-02-15",
    },
    {
      id: 2,
      name: "Jimena Chavez",
      status: "disconnected",
      lastSeen: "2024-02-14",
    },
    {
      id: 3,
      name: "Emanuel Armenta",
      status: "disconnected",
      lastSeen: "2024-02-14",
    },
  ];

  const [data, setData] = useState(initialData);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };


  return (
    <>
      <Nav>
        <Title>Colaboradores</Title>
        {/* Caja que contiene el boton para regresar una pagina atras */}
        <div className="w-[9%] bottom-9 left-6 relative">
          <button className="rounded-full shadow-md">
            <Link to="/departamentos">
              <img
                src="flechaAtras.png"
                className="size-8 max-[281px]:size-6"
                alt=""
              />
            </Link>
          </button>
        </div>

        {/* Seccion que contiene los filtros de los trabajadores */}
        <section className="justify-center mx-2 my-8 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
          <Filter>Online</Filter>
        </section>

        <section className="w-[100%] flex justify-center">
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
              {data.map((person) => (
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
                      onClick={() => handleDelete(person.id)}
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