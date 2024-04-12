import { Tarjeta } from "../ui/Tarjeta";
import { useTicket } from '../../context/TicketsContext';

function TicketsNews({ to, className, children, ...rest }) {

    const {
        tickestNews
      } = useTicket();

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

  return (
    <>
    {tickestNews.map((ticket, i) => (
      <Tarjeta to={`/ticket/${ticket.id || ticket._id}` || to} key={i}>
        {/* Caja dentro del ticket que contiene los componentes del lado izquierdo */}
        <div className="w-[60%] max-[541px]:w-auto">
          {/* Caja que contiene el estado del ticket */}
          <div className="flex w-[100%] items-center">
            <p>Estado:</p>
            <span
              className={`font-semibold ml-1 h-5 w-auto flex justify-center items-center ${getColorText(
                ticket.status
              )}`}
            >
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
            <span className="font-semibold text-black">{ticket.title}</span>
            <span className=" text-sm text-gray-400 ml-2">#No. ticket</span>
          </div>
          {/* Caja que contiene los componentes de quien creo el ticket y cuando se creo */}
          <div className="w-[100%] mt-2 flex items-center max-[541px]:flex-col">
            <div className="flex items-center">
              <img src="user-solid.png" className="size-5 mr-2" alt="" />
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
              <img src="alerta.png" className="size-5 ml-2 mr-1" alt="" />
              <span
                className={`font-semibold text-black rounded-md mx-1 px-1 ${getColorClass(
                  ticket.priority
                )}`}
              >
                {ticket.priority}
              </span>
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
              <img src="asignar.png" className="size-5 ml-2 mr-1" alt="" />
              <span>{ticket.assignedTo}</span>
            </div>
          </div>
        </div>
      </Tarjeta>
    ))}
  </>
  )
}

export default TicketsNews