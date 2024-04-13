import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Title } from "../components/Headers/Title";
import { Link } from "react-router-dom";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useCollab } from "../context/UsersContext";
import ReturnButton from "../components/ui/ReturnButton";
import { useParams, useNavigate, } from "react-router-dom";
import * as images from '../img/index.js'

 

function AccountCollabPage() {
  const params = useParams();
  const { getUserById } = useCollab();
  const [assignedTickets, setAssignedTickets] = useState([])
  const [getName, setGetName] = useState()
 // Estado para controlar qué vista se muestra
 const [vista, setVista] = useState('tickets'); // Inicia con la vista de tickets

 useEffect(() => {
  async function loadUser() {
    try {
      if (params.id) {
        const userById = await getUserById(params.id);
        if (userById) {
          setGetName(userById.userFound.name)
          setAssignedTickets(userById.ticketsForUser)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  loadUser();
}, []);

const getColorClass = (priority) => {
  switch (priority) {
    case 'Bajo':
      return 'bg-green-400';
    case 'Medio':
      return 'bg-yellow-400';
    case 'Alto':
      return 'bg-orange-400';
    case 'Critico':
      return 'bg-red-500';
    default:
      return 'bg-gray-200'; // Color por defecto si la prioridad no coincide
  }
};

const getColorText = (status) => {
  switch (status) {
    case 'Nuevo':
      return 'text-green-600';
    case 'En curso':
      return 'text-yellow-600';
    case 'En pausa/revision':
      return 'text-orange-600';
    case 'Resuelto':
      return 'text-blue-600';
    default:
      return 'bg-gray-600'; // Color por defecto si la prioridad no coincide
  }
};

 // Componentes para cada vista
 const Tickets = () => (
   <div className="h-[100%] w-[100%] flex items-center flex-col">
     {assignedTickets && assignedTickets.length > 0 ? (
       <>
         {assignedTickets.map((ticket, i) => (
           <Tarjeta key={i} to={`/ticket/${ticket.id || ticket._id}`}>
            {/* Caja dentro del ticket que contiene los componentes del lado izquierdo */}
            <div className="w-[60%] max-[541px]:w-auto">
                          {/* Caja que contiene el estado del ticket */}
                          <div className="flex w-[100%] items-center">
                            <p>Estado:</p>
                            <span className={`font-semibold ml-1 h-5 w-auto flex justify-center items-center ${getColorText(ticket.status)}`}>
                            {/* <span className="ml-1 h-5 w-auto flex justify-center items-center border-yellow-500 border-2 bg-yellow-200"> */}
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
                                src={images.userIcon}
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
                                src={images.priority}
                                className="size-5 ml-2 mr-1"
                                alt=""
                              />
                              <span className={`font-semibold text-black rounded-md mx-1 px-1 ${getColorClass(ticket.priority)}`}>{ticket.priority}</span>
                            </div>
                          </div>
                          <div className="items-center min-[1337px]:flex justify-center max-[913px]:justify-start max-[913px]:flex max-[769px]:flex-col max-[541px]:flex-row max-[281px]:flex-col">
                            <p className="font-medium text-black">Dpto:</p>
                            <div className="flex">
                              <img
                                src={images.department}
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
                                src={images.assign}
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
       <p>Aun no se han asignado tickets.</p>
     )}
   </div>
 );
 const Notas = () => <div>Notas para el usuario</div>;
 const Estadisticas = () => <div>Estadísticas del usuario</div>;

  // Funciones para cambiar la vista
  const mostrarTickets = () => setVista('tickets');
  const mostrarNotas = () => setVista('notas');
  const mostrarEstadisticas = () => setVista('estadisticas');

  let contenido;
  if (vista === 'tickets') {
    contenido = <Tickets />;
  } else if (vista === 'notas') {
    contenido = <Notas />;
  } else if (vista === 'estadisticas') {
    contenido = <Estadisticas />;
  }
  
  return (
    <Nav>
      <Title>Cuenta</Title>
      {/* Caja que contiene el boton para regresar una pagina atras */}
      <div className="w-[9%] bottom-9 left-6 relative">
        <button className="rounded-full shadow-md">
          <Link to="/accounts">
            <ReturnButton />
          </Link>
        </button>
      </div>

      <section className="w-[100%] h-auto">
        <div className="w-[100%] flex justify-center">
          <Tarjeta className="w-[80%] h-auto flex-col items-center max-[1281px]:w-[95%] max-[391px]:w-[90%]">
            <div className="w-[100%] h-36 flex justify-center items-center">
              <div className="w-[90%] flex">
                <div className="">
                  <Title className="">
                    {getName}
                  </Title>
                </div>
              </div>
              {/* <div className='w-[50%]'>
                        <div className='w-[100%] flex justify-center'>
                            <button>
                                <p>Mensaje</p>
                                <img src="" alt="" />
                            </button>
                        </div>
                    </div> */}
            </div>
            <div className="w-[100%] flex h-20 bg-slate-300 rounded-md items-center">
              <div className="mx-4 text-xl max-[321px]:text-sm">
                <button onClick={mostrarTickets}>Tickets</button>
              </div>
              <div className="mx-4 text-xl max-[321px]:text-sm">
                <button onClick={mostrarNotas}>Notas</button>
              </div>
              <div className="mx-4 text-xl max-[321px]:text-sm">
                <button onClick={mostrarEstadisticas}>Estadísticas</button>
              </div>
            </div>
          </Tarjeta>
        </div>
      </section>

      <section className="flex h-screen flex-col select-none">
        <div className="h-screen mt-8 flex items-center flex-col">
          {/* Contenido renderizado según la vista */}
          {contenido}
        </div>
      </section>
    </Nav>
  );
}

export default AccountCollabPage;