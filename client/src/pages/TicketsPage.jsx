import Nav from '../components/Nav'
import { Tarjeta } from '../components/ui/Tarjeta';
import { Title } from '../components/Headers/Title';
import Filter from '../components/ui/Filter';
import { useTicket } from '../context/TicketsContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Tickets from '../components/Tickets/Tickets';
import TicketsNews from '../components/Tickets/TicketsNews';
import TicketsInProgress from '../components/Tickets/TicketsInProgress';
import TicketsInRevision from '../components/Tickets/TicketsInRevision';
import TicketsResolves from '../components/Tickets/TicketsResolves';

function TicketsPage() {
  const {
    getTickets,
    ticket,
    ticketInProgress,
    tickestNews,
    ticketsInRevision,
    ticketsResolves,
    getAllTicketsInProgress,
    getAllTicketsNews,
    getAllTicketsResolve,
    getAllTicketsInRevision,
  } = useTicket();
  const { user } = useAuth();
  const [vista, setVista] = useState('tickets');

  useEffect(() => {
    getTickets();
    getAllTicketsNews()
    getAllTicketsResolve()
    getAllTicketsInRevision()
    getAllTicketsInProgress()
  }, []);

  const getColorClass = (priority) => {
    switch (priority) {
      case "Bajo":
        return "bg-green-400";
      case "Medio":
        return "bg-yellow-400";
      case "Alto":
        return "bg-orange-400";
      case "Critico":
        return "bg-red-500";
      default:
        return "bg-gray-200"; // Color por defecto si la prioridad no coincide
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
 const AllTickets = () => (
   <>
     {ticket && ticket.length > 0 ? (
       <>
         {/* Contenido renderizado según la vista */}
         <Tickets/>
       </>
     ) : (
       <p>Bienvenido/a {user.userName} no hay tickets disponibles.</p>
     )}
   </>
 );
const AllTicketsNews = () => (
  <>
    {tickestNews && tickestNews.length > 0 ? (
      <>
        {/* Contenido renderizado según la vista */}
        <TicketsNews/>
      </>
    ) : (
      <p>Bienvenido/a {user.userName} no hay tickets nuevos disponibles.</p>
    )}
  </>
);
 const AllTicketsInProgress = () => (
   <>
     {ticketInProgress && ticketInProgress.length > 0 ? (
       <>
         {/* Contenido renderizado según la vista */}
         <TicketsInProgress/>
       </>
     ) : (
       <p>Bienvenido/a {user.userName} no hay tickets en curso disponibles.</p>
     )}
   </>
 );
const AllTicketsInRevision = () => (
  <>
    {ticketsInRevision && ticketsInRevision.length > 0 ? (
      <>
        {/* Contenido renderizado según la vista */}
        <TicketsInRevision/>
      </>
    ) : (
      <p>
        Bienvenido/a {user.userName} no hay tickets en revisión disponibles.
      </p>
    )}
  </>
);
const AllTicketsResolves = () => (
  <>
    {ticketsResolves && ticketsResolves.length > 0 ? (
      <>
        {/* Contenido renderizado según la vista */}

        <TicketsResolves/>
      </>
    ) : (
      <p>Bienvenido/a {user.userName} no hay tickets resueltos disponibles.</p>
    )}
  </>
);

 // Funciones para cambiar la vista
 const viewAllTickets = () => setVista('allTickets')
 const viewTicketsNews = () => setVista('allticketsNews')
 const viewTicketsInProgress = () => setVista('allticketsInProgress');
 const viewTicketsInRevision = () => setVista('allTicketsInRevision');
 const viewTicketsResolves = () => setVista('allticketsresolves');

 let contenido;
 if(vista === 'allTickets'){
  contenido = <AllTickets />;
 }else if
 (vista === 'allticketsNews') {
  contenido = <AllTicketsNews />;
}else if
  (vista === 'allticketsInProgress') {
   contenido = <AllTicketsInProgress />;
 } else if (vista === 'allTicketsInRevision') {
   contenido = <AllTicketsInRevision/>;
 } else if (vista === 'allticketsresolves') {
   contenido = <AllTicketsResolves/>;
 }else
 contenido = <AllTickets />;
  
 


  return (
    <>
      <Nav>
        <Title>Tickets</Title>
        {/* Etiqueta que engloba los filtros */}
        <section className=" mx-2 w-auto h-20 text-lg max-[767px]:flex max-[767px]:text-sm max-[767px]:h-340 max-[767px]:items-center max-[541px]:flex  max-[541px]:justify-center max-[541px]:mt-3">
          <Filter>
            <button
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
              onClick={viewAllTickets}
            >
              <p>Todos</p>
              <span></span>
            </button>
            <button
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
              onClick={viewTicketsNews}
            >
              <p>Nuevos</p>
              <span></span>
            </button>
            <button
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
              onClick={viewTicketsInProgress}
            >
              <p>En Curso</p>
              <span></span>
            </button>
            <button
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
              onClick={viewTicketsInRevision}
            >
              <p>En pausa/revision</p>
            </button>
            <button
              className="hover:-translate-y-2 hover:shadow-2xl duration-500 w-32 shadow-md h-24 rounded-xl p-2 bg-white max-[767px]:mx-3 max-[767px]:px-5"
              onClick={viewTicketsResolves}
            >
              <p>Resueltos</p>
            </button>
          </Filter>
        </section>
        {/* Caja que contiene los sections */}
        <div className="flex h-screen flex-col select-none">
          <section className="h-screen mt-8 flex items-center flex-col">
            <div className="h-auto w-[100%] flex items-center flex-col">
            {contenido}
            </div>
          </section>
        </div>
      </Nav>
    </>
  );
}

export default TicketsPage