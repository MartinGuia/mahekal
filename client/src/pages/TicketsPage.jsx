import React from 'react'
import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import Filter from '../components/ui/Filter';
import { useTicket } from '../context/TicketsContext';
import { useEffect } from 'react';

function TicketsPage() {

  const {getTickets, ticket} = useTicket()

 useEffect(() => {
    const fetchData = async () => {
      try {
        getTickets()
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };
  
    fetchData(); // Llamar a la función para obtener las opciones al montar el componente
  }, []);


  return (
    <>
      <Nav>
        <Title>Tickets</Title>

        {/* Caja que contiene los sections */}
        <div className="flex h-screen flex-col select-none">
          {/* Etiqueta que engloba los filtros */}
          <section className="justify-center mx-2 my-8 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
            <Filter>
              <p>Pendientes</p>
            </Filter>
          </section>

          <section className="h-screen mt-8 flex items-center flex-col">
            <div className="h-[100%] w-[100%] flex items-center flex-col">
              {ticket.map((ticket, i)=>(
                // to={`${`/ticket`}/${ticket.id}`}
                <Tarjeta to={`/ticket/${ticket.id}`} key={i}  >
                {/* Caja dentro del ticket que contiene los componentes del lado izquierdo */}
                <div className="w-[60%] max-[541px]:w-auto">
                  {/* Caja que contiene el estado del ticket */}
                  <div className="flex w-[100%] items-center">
                    <p>Estado:</p>
                    <span className="ml-1 h-5 w-auto flex justify-center items-center border-yellow-500 border-2 bg-yellow-200">
                      {ticket.status}
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
                      {ticket.title}
                    </span>
                    <span className=" text-sm text-gray-400 ml-2">
                      #No. ticket
                    </span>
                  </div>
                  {/* Caja que contiene los componentes de quien creo el ticket y cuando se creo */}
                  <div className="w-[100%] mt-2 flex items-center max-[541px]:flex-col">
                    <div className="flex items-center">
                      <img
                        src="user-solid.png"
                        className="size-5 mr-2"
                        alt=""
                      />
                      <span>{ticket.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                      - Creado: {new Date(ticket.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {/* Caja que contiene los componentes del lado derecho */}
                <hr className="max-[541px]:visible border-2 my-2" />
                <div className="w-[40%] flex flex-col text-sm justify-evenly max-[913px]:w-[50%] max-[769px]:w-[40%] max-[541px]:w-auto max-[541px]:items-center">
                  <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                    <p className="font-medium text-black">Prioridad:</p>
                    <div className="flex max-[1025px]:flex">
                      <img
                        src="alerta.png"
                        className="size-5 ml-2 mr-1"
                        alt=""
                      />
                      <span>{ticket.priority}</span>
                    </div>
                  </div>
                  <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                    <p className="font-medium text-black">Dpto:</p>
                    <div className="flex">
                      <img
                        src="departamento.png"
                        className="size-5 ml-2 mr-1"
                        alt=""
                      />
                      <span>{ticket.assignedDepartment}</span>
                    </div>
                  </div>
                  <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                    <p className="font-medium text-black">Asignado a:</p>
                    <div className="flex">
                      <img
                        src="asignar.png"
                        className="size-5 ml-2 mr-1"
                        alt=""
                      />
                      <span>Martin Garcia</span>
                    </div>
                  </div>
                </div>
              </Tarjeta>
              ))}
            </div>
          </section>
        </div>
      </Nav>
    </>
  );
}

export default TicketsPage