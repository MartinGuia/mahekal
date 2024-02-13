import React from 'react'
import { Link } from 'react-router-dom'

function TicketComponent() {
  return (
    <>
      <main className="flex justify-center select-none">
        <div className="flex flex-col mt-2">
          <h1 className="text-mahekal-brown font-medium max-[450px]:text-2xl text-4xl text-center duration-0">
            Tickets
          </h1>
          <hr className="w-40 mt-1.5 border-mahekal-brown duration-0" />
        </div>
      </main>

      {/* Caja que contiene los sections */}
      <div className="flex h-screen flex-col select-none">
        {/* Etiqueta que engloba los filtros */}
        <section className="justify-center mx-2 my-8 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
          {/* Caja que contiene las cajas de filtros de los tickets */}
          <div className="px-5 flex columns-4 justify-evenly max-[767px]:justify-between max-[767px]:w-36 max-[767px]:border max-[767px]:rounded-lg max-[767px]:resize-none max-[767px]:overflow-y-auto max-[767px]:scrollbar-thin max-[767px]:scrollbar-webkit">
            <div className=" w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
              <p>Pendientes</p>
            </div>
            <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
              <p>Activos</p>
            </div>
            <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
              <p>Caducados</p>
            </div>
            <div className="w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5">
              <p>Tickets</p>
            </div>
          </div>
        </section>

        {/* Seccion del area de tickets */}
        <section className="h-screen mt-8 flex items-center flex-col">
          {/* Caja que contendra los tickets */}
          <div className="h-[100%] w-[100%] flex items-center flex-col">
            {/* Caja del ticket */}
            <Link
              to="/newticket"
              className="flex w-[45%] h-[22%] my-3 p-2 shadow-xl border-mahekal-brown border-2 rounded-2xl bg-white max-[1025px]:w-[65%] max-[1281px]:w-auto max-[1281px]:h-auto max-[541px]:w-[80%] max-[541px]:text-base max-[541px]:flex-col max-[281px]:text-xs"
            >
              {/* Caja dentro del ticket que contiene los componentes del lado izquierdo */}
              <div className="w-[60%] max-[541px]:w-auto">
                {/* Caja que contiene el estado del ticket */}
                <div className="flex w-[100%] items-center">
                  <p>Estado:</p>
                  <span className="ml-1 h-5 w-auto flex justify-center items-center border-yellow-500 border-2 bg-yellow-200">
                    En espera
                  </span>
                </div>
                {/* Caja que contiene el tiempo de ejecución */}
                <div className="flex text-sm text-gray-400 mt-2">
                  <p>Tiempo de ejecución:</p>
                  <span className="ml-2">4h</span>
                </div>
                {/* Caja que contiene el titulo de ticket y el numero */}
                <div className="w-[100%] mt-1">
                  <span className="font-semibold text-black">
                    Titulo de ticket
                  </span>
                  <span className=" text-sm text-gray-400 ml-2">
                    #No. ticket
                  </span>
                </div>
                {/* Caja que contiene los componentes de quien creo el ticket y cuando se creo */}
                <div className="w-[100%] mt-2 flex items-center max-[541px]:flex-col">
                  <div className="flex items-center">
                    <img src="user-solid.png" className="size-5 mr-2" alt="" />
                    <span> Martin García Guía</span>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    - Creado: 18/01/2024 2:27pm
                  </span>
                </div>
              </div>
              {/* Caja que contiene los componentes del lado derecho */}
              <hr className='max-[541px]:visible border-2 my-2'/>
              <div className="w-[40%] flex flex-col text-sm justify-evenly max-[913px]:w-[50%] max-[769px]:w-[40%] max-[541px]:w-auto max-[541px]:items-center">
                <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                  <p className="font-medium text-black">Prioridad:</p>
                  <div className='flex max-[1025px]:flex'>
                    <img src="alerta.png" className="size-5 ml-2 mr-1" alt="" />
                    <span>Critico</span>
                  </div>
                </div>
                <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                  <p className="font-medium text-black">Dpto:</p>
                  <div className='flex'>
                    <img src="departamento.png" className="size-5 ml-2 mr-1" alt=""/>
                    <span>Sistemas</span>
                  </div>
                </div>
                <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                  <p className="font-medium text-black">Asignado a:</p>
                  <div className='flex'>
                    <img src="asignar.png" className='size-5 ml-2 mr-1' alt="" />
                    <span>Martin Garcia</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default TicketComponent