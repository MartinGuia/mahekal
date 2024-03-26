import { useState, useEffect } from "react";
import tickets from "../img/boleto.png";
import dptos from "../img/departamento.png";
import cuentas from "../img/agregar-usuario.png";
import mensaje from "../img/mensaje.png";
import { Link } from 'react-router-dom';
import LinkButton from "./ui/LinkButton";
import { useAuth } from "../context/AuthContext";
import menu from '../img/menu.png'
import logo from '../img/LogoMahekal.png'
import logoutImg from '../img/logout.png'
import {useForm} from 'react-hook-form';
import { useTicket } from '../context/TicketsContext'
import Modal from '../components/ui/Modal';
import { Title } from '../components/Headers/Title'
import cerrar from '../img/cerrar.png'

export default function Nav({children}) {
  const [open, setOpen] = useState(false);
  const isSmallScreen = window.innerWidth < 541;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    obtenerDatosTicket,
    signupTicket,
    errors: registerErrors,
  } = useTicket();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [lastnameUsuario, setLastnameUsuario] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const { logout, role,  getRole} =
    useAuth();
  const toggleAside = () => {
    setOpen(!open);
  };
const [userRole1, setUserRole1] = useState()
const [userDpto1, setUserDpto1] = useState()

const [roleAdmin, setRoleAdmin] = useState([])
const [roleManager, setRoleManager] = useState()
const [roleChiefArea, setRoleChiefArea] = useState()
const [roleOperator, setRoleOperator] = useState()

useEffect(() => {
  const fetchData = async () => {
    const res = await getRole();
    
    if (res) {
      for (const role of res) {
        if (role.name === "Administrador") {
          setRoleAdmin(role._id);
        } else if (role.name === "Gerente Administrador") {
          setRoleManager(role._id);
        } else if (role.name === "Gerente Área") {
          setRoleChiefArea(role._id);
        } else if (role.name === "Operador") {
          setRoleOperator(role._id);
        }
      }
    }
  };
  fetchData();
}, []);


  useEffect(() => {
    try {
      const token = role; // Aquí debes proporcionar el token JWT
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar la carga útil
      const userRole = decodedToken.role; // Obtener el valor del rol
      const userDpto = decodedToken.department;
      setUserRole1(userRole);
      setUserDpto1(userDpto);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  const Menus = [
    {
      id: 1,
      title: "Tickets",
      image: tickets,
      to: "/tickets",
    },
    {
      id: 2,
      title: "Dptos.",
      image: dptos,
      to: "/departamentos",
    },
    {
      id: 3,
      title: "Cuentas",
      image: cuentas,
      to: "/accounts",
    },
    {
      id: 4,
      title: "Foro",
      image: mensaje,
      to: "/",
    },
  ];

  const Menus2 = [
    {
      id: 1,
      title: "Tickets",
      image: tickets,
      to: "/tickets",
    },
    {
      id: 2,
      title: "Dptos.",
      image: dptos,
      to: "/departamentos",
    },
    {
      id: 3,
      title: "Foro",
      image: mensaje,
      to: "/",
    },
  ];
  const Menus3 = [
    {
      id: 1,
      title: "Tickets",
      image: tickets,
      to: "/tickets",
    },
    {
      id: 2,
      title: "Dptos.",
      image: dptos,
      to: `/listadptocollabs/${userDpto1}`,
    },
    {
      id: 3,
      title: "Foro",
      image: mensaje,
      to: "/",
    },
  ];
  const Menus4 = [
    {
      id: 1,
      title: "Tickets",
      image: tickets,
      to: "/tickets",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signupTicket(data);
    handleCloseModal();
  });

  useEffect(() => {
    const fetchData = async () => {
      const datosTicket = await obtenerDatosTicket();
      if (datosTicket) {
        setNombreUsuario(datosTicket.userFound.name);
        setLastnameUsuario(datosTicket.userFound.lastname);
        setDepartamentos(datosTicket.departments);
        departamentos.map((option) => ({
          value: option.id,
          label: option.name, // Utilizar el valor 'name' como label en las opciones
        }));
      }
    };

    fetchData();
  }, []);
  

  let navegador1;
  if (userRole1 === roleAdmin) {
    navegador1 = Menus.map((menu) => (
      <li key={menu.id}>
        <Link
          className="flex rounded-md p-3 mt-2 cursor-pointer hover:bg-water-blue items-center gap-x-3"
          to={menu.to}
        >
          <img src={menu.image} className="size-8" />
          <span
            className={`flex-1 text-mahekal-brown text-lg font-normal ${
              !open && "invisible"
            }`}
          >
            {menu.title}
          </span>
        </Link>
      </li>
    ));
  } else if (userRole1 === roleManager) {
    navegador1 = Menus2.map((menu) => (
      <li key={menu.id}>
        <Link
          className="flex rounded-md p-3 mt-2 cursor-pointer hover:bg-water-blue items-center gap-x-3"
          to={menu.to}
        >
          <img src={menu.image} className="size-8" />
          <span
            className={`flex-1 text-mahekal-brown text-lg font-normal ${
              !open && "invisible"
            }`}
          >
            {menu.title}
          </span>
        </Link>
      </li>
    ));
  } else if (userRole1 === roleChiefArea) {
    navegador1 = Menus3.map((menu) => (
      <li key={menu.id}>
        <Link
          className="flex rounded-md p-3 mt-2 cursor-pointer hover:bg-water-blue items-center gap-x-3"
          to={menu.to}
        >
          <img src={menu.image} className="size-8" />
          <span
            className={`flex-1 text-mahekal-brown text-lg font-normal ${
              !open && "invisible"
            }`}
          >
            {menu.title}
          </span>
        </Link>
      </li>
    ));
  } else if (userRole1 === roleOperator) {
    navegador1 = Menus4.map((menu) => (
      <li key={menu.id}>
        <Link
          className="flex rounded-md p-3 mt-2 cursor-pointer hover:bg-water-blue items-center gap-x-3"
          to={menu.to}
        >
          <img src={menu.image} className="size-8" />
          <span
            className={`flex-1 text-mahekal-brown text-lg font-normal ${
              !open && "invisible"
            }`}
          >
            {menu.title}
          </span>
        </Link>
      </li>
    ));
  }

  // useEffect(() => {
  //   console.log(userRole1);
  // }, []);

  return (
    <>
      {/* menu de navegacion superior */}
      <nav className="flex bg-white w-[100%] h-16 drop-shadow-xl select-none">
        {/* Caja que engloba las dos cajas que contiene el nav con sus respectivos componentes*/}
        <div className="w-[40%] flex items-center">
          <button
            onClick={toggleAside}
            className="flex justify-center hover:bg-zinc-200 duration-500 items-center ml-5 border-mahekal-brown border-2 w-[14%] h-[70%] bg-gray-100 rounded-md drop-shadow-md max-[767px]:w-[24%]"
            id="buttonAside"
          >
            <img src={menu} className="size-7" alt="" />
          </button>

          <div className="flex items-center w-[50%] h-auto">
            <LinkButton
              className="ml-4 max-[767px]:w-[50%]"
              onClick={handleOpenModal}
            >
              {isSmallScreen ? "+" : "Nuevo Ticket +"}
            </LinkButton>
          </div>
        </div>

        {/* Caja que engloba el apartado del buscador y notificaciones */}
        <div className="w-[60%] flex">
          {/* Componente del buscador */}
          <form action="" className="flex w-[90%] justify-center">
            <button>
              <img src="search.png" alt="" />
            </button>

            <input
              type="search"
              placeholder="Search"
              className="w-[65%] p-1 rounded bg-mahekal-input m-2 border-solid border-2 border-black"
              name="search"
              id=""
            />
          </form>

          {/* Componente del png de la campanita de notificaciones */}
          <div className=" flex mr-3">
            <button className="">
              <img src="bell.png" alt="" />
            </button>
          </div>
        </div>
      </nav>

      {/* Contenedor que tiene aside y section */}
      <div className="flex h-screen select-none">
        {/* Elemento aside */}
        <aside
          id="myAside"
          className={`bg-white ${open ? "md:block w-64" : "max-w-0"}`}
        >
          {/* Caja que contiene titulo del menu y linea inferior de este */}
          <div className="justify-center mt-2">
            <h1
              className={`text-mahekal-brown font-medium max-[450px]:text-2xl text-4xl text-center duration-0 ${
                !open && "invisible"
              }`}
            >
              Mahekal
            </h1>
            <hr
              className={`w-auto mx-5 mt-1.5 border-mahekal-brown duration-0 ${
                !open && "invisible"
              }`}
            />
          </div>

          {/* Componente que contiene los iconos y nombres del menu */}
          <ul className={`pt-2`}>
            {navegador1}
            {/* {Menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  className="flex rounded-md p-3 mt-2 cursor-pointer hover:bg-water-blue items-center gap-x-3"
                  to={menu.to}
                >
                  <img src={menu.image} className="size-8" />
                  <span
                    className={`flex-1 text-mahekal-brown text-lg font-normal ${
                      !open && "invisible"
                    }`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))} */}
          </ul>

          {/* Caja que contiene el Logo mahekal */}
          <div className="flex items-center flex-col mt-6">
            <img
              src={logo}
              alt="LogoMahekal"
              className="max-[1025px]:size-28 size-36"
            />
          </div>
          <div className="flex mt-10 justify-end mr-6 items-center">
            {/* <button
              className={`hover:bg-water-blue rounded-md py-2 text-mahekal-brown px-4 flex gap-x-3 text-lg ${
                !open && "invisible"
              }`}
            >
              <img src="logout.png" alt="logout" className="size-6 flex mt-1" />
              Logout
            </button> */}
            <LinkButton
              className={`hover:bg-water-blue rounded-md py-2 text-mahekal-brown px-4 flex gap-x-3 text-lg ${
                !open && "invisible"
              }`}
              to="/"
              onClick={() => {
                logout();
              }}
            >
              <img src={logoutImg} alt="logout" className="size-6 flex mt-1" />
              Logout
            </LinkButton>
          </div>
        </aside>

        {/* Elemento Section */}
        <section
          className={`bg-light-bone w-screen ${
            open && "blur-sm max-[542px]:hidden"
          }`}
        >
          
          {children}
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative bg-white rounded-lg">
          <div className="w-[100%] flex justify-end">
            <button>
              <img src={cerrar} alt="" className="size-8" />
            </button>
          </div>
          <Title>Nuevo Ticket</Title>

          <form
            className="flex flex-col items-center"
            onSubmit={onSubmit}
            // onSubmit={handleSubmit}
          >
            {/* <img className="w-20 p-1" src={logo} alt="Mahekal Logo" /> */}
            {registerErrors.map((error, i) => (
              <div
                key={i}
                className="bg-red-500 text-white w-[100%] rounded-md py-1"
              >
                {error}
              </div>
            ))}
            <label className="mt-2" htmlFor="">
              Nombre
            </label>
            <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="text"
              {...register("name")}
              value={nombreUsuario + " " + lastnameUsuario}
              readOnly
            />
            <label htmlFor="">Titulo ticket</label>
            <input
              className="w-full bg-mahekal-input p-2 rounded m-2"
              type="text"
              {...register("title", { required: true })}
              placeholder="Titulo de ticket"
              autoFocus
            />
            {errors.title && (
              <p className="text-red-500">El titulo es requerido*</p>
            )}
            <label htmlFor="">Prioridad:</label>
            <select
              className="w-[100%] text-base rounded-md block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 hover:focus:border-blue-500"
              {...register("priority", { required: true })}
            >
              <option>Selecciona una opccion . . .</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
              <option value="Critico">Critico</option>
            </select>
            {errors.userName && (
              <p className="text-red-500">La prioridad es requerida*</p>
            )}
            <label htmlFor="">Departamento:</label>
            <select
              className="w-[100%] text-base rounded-lg block p-2 bg-white border-gray-400 border-2 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              {...register("assignedDepartment", { required: true })}
            >
              <option>Selecciona una opccion...</option>
              {departamentos.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="">No. habitacion o area:</label>
            <div className="max-[541px]:flex max-[541px]:justify-center">
              <input
                {...register("roomOrArea", { required: true })}
                type="text"
                className="p-1 rounded border-2 border-blacks w-[100%] max-[281px]:w-[100%] mb-3"
              />
            </div>
            {errors.roomOrArea && (
              <p className="text-red-500">
                La habitacion o area es requerido/a*
              </p>
            )}
            <div className="flex w-[100%] justify-center">
              <textarea
                rows="3"
                placeholder="Describa el problema..."
                {...register("description")}
                className="w-[100%] border-2 rounded-md"
              ></textarea>
            </div>
            {/* Caja que contiene la insercion de imagenes */}
            <div className="flex justify-center mt-3">
              {/* <input  type="file" {...register("imageURL")}/> */}
              {/* <div
                {...getRootProps()}
                className="text-gray-400 border-2 py-[4%] px-[4%] border-dashed border-mahekal-brown cursor-pointer shadow-lg"
              >
                <input
                  {...getInputProps()}
                  {...register("imageURL", { required: false })}
                />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Arrastra o selecciona los archivos</p>
                )}
              </div>
              {/* <input type="file"
              onChange={e => setFile(e.target.files[0])}
            /> */}
              {/*Toma el objeto file y lo convierte a una url para mostrarlo como previsualizacion de la img escogida */}
              {/* {acceptedFiles[0] && (
                // <img
                //   src={URL.createObjectURL(acceptedFiles[0])}
                //   className="size-40"
                //   alt=""
                // />
              )} */}
            </div>
            <button
              className="p-2 m-2 w-1/2 rounded-lg bg-water-blue hover:bg-water-blue-hover"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
