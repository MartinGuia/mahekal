import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Title } from "../components/Headers/Title";
import { Link } from "react-router-dom";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useCollab } from "../context/UsersContext";
import ReturnButton from "../components/ui/ReturnButton";
import { useParams, useNavigate } from "react-router-dom";

 

function AccountCollabPage() {
  const params = useParams();
  const { getUserById } = useCollab();
  const [getRole, setGetRole] = useState();
  const [getDpto, setGetDpto] = useState();
  const [getNameUser, setGetNameUser] = useState();
  const [getLastnameUser, setGetLastnameUser] = useState();
  const [getUserName, setGetUserName] = useState();
  const [assignedTickets, setAssignedTickets] = useState([])
 // Estado para controlar qué vista se muestra
 const [vista, setVista] = useState('tickets'); // Inicia con la vista de tickets

 // Componentes para cada vista
 const Tickets = () => (
   <div className="h-[100%] w-[100%] flex items-center flex-col">
     {assignedTickets && assignedTickets.length > 0 ? (
       <>
         {assignedTickets.map((ticket, i) => (
           <Tarjeta key={i}>{assignedTickets}</Tarjeta>
         ))}
       </>
     ) : (
       <p>Aun no se han asignado tickets.</p>
     )}
   </div>
 );
 const Notas = () => <div>Notas para el usuario</div>;
 const Estadisticas = () => <div>Estadísticas del usuario</div>;

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const userById = await getUserById(params.id);
          // console.log(userById);
          if (userById) {
            setGetNameUser(userById.name);
            setGetLastnameUser(userById.lastname);
            setGetUserName(userById.userName);
            setGetRole(userById.role.name);
            setGetDpto(userById.department.name);
            setAssignedTickets(userById.tickets)
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);

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
                    {getNameUser} {getLastnameUser}
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
