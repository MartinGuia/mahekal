import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import Filter from '../components/ui/Filter';
import { useTicket } from '../context/TicketsContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function TicketsPage() {
  const {
    getTickets,
    ticket,
    getStatus,
    getAllTicketsInProgress,
    getAllTicketsNews,
    getAllTicketsResolve,
  } = useTicket();
  const { user } = useAuth();
  const [filter, setFilter] = useState("nuevo"); // Estado por defecto

  useEffect(() => {
    getTickets();
  }, []); 

  return (
    <>
      <Nav>
        <Title>Tickets</Title>

        {/* Caja que contiene los sections */}
        <div className="flex h-screen flex-col select-none">
          <section className="h-screen mt-8 flex items-center flex-col">
            <div className="h-auto w-[100%] flex items-center flex-col">
              {ticket && ticket.length > 0 ? (
                <>
                  {/* Etiqueta que engloba los filtros */}
                  <section className="justify-center mx-2 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center">
                    {/* Botones de filtro */}
                    {/* <button onClick={() => handleFilterChange("nuevo")}>
                      Nuevo
                    </button>
                    <button onClick={() => handleFilterChange("en curso")}>
                      En curso
                    </button>
                    <button onClick={() => handleFilterChange("en pausa")}>
                      En pausa
                    </button>
                    <button onClick={() => handleFilterChange("resuelto")}>
                      Resuelto
                    </button> */}
                    {/* <Filter>
                      <button className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"></button>
                    </Filter> */}
                  </section>
                    {ticket.map((ticket, i) => (
                      // to={`${`/ticket`}/${ticket.id}`}
                      <Tarjeta to={`/ticket/${ticket.id || ticket._id}`} key={i}>
                        {/* Caja dentro del ticket que contiene los componentes del lado izquierdo */}
                        <div className="w-[60%] max-[541px]:w-auto">
                          {/* Caja que contiene el estado del ticket */}
                          <div className="flex w-[100%] items-center">
                            <p>Estado:</p>
                            <span className={`ml-1 h-5 w-auto flex justify-center items-center`}>
                              {ticket.status}
                            </span>
                          </div>
                          {/* Caja que contiene el tiempo de ejecución */}
                          <div className="flex text-sm text-gray-400 mt-2">
                            <p>Tiempo de ejecución:</p>
                            <span className="ml-2">{ticket.ejecutionTime}</span>
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
                              - Creado: {ticket.date}
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
                              <span>{ticket.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                      </Tarjeta>
                    ))}
                </>
              ) : (
                <p>Bienvenido/a {user.userName} no hay tickets disponibles.</p>
              )}
            </div>
          </section>
        </div>
      </Nav>
    </>
  );
}

export default TicketsPage