import React, { useState } from "react";
import tickets from "../img/boleto.png";
import dptos from "../img/departamento.png";
import cuentas from "../img/agregar-usuario.png";
import mensaje from "../img/mensaje.png";
import cuenta from "../img/usuario.png";
import { Link } from 'react-router-dom';
import LinkButton from "./ui/LinkButton";

export default function Nav({children}) {
  const [open, setOpen] = useState(false);
  
  const toggleAside = () => {
    setOpen(!open);
  };

  const Menus = [
    {
      id: 1,
      title: "Tickets",
      image: tickets,
      to: "/tickets"
    },
    {
      id: 2,
      title: "Dptos.",
      image: dptos,
      to: '/departamentos'
    },
    {
      id: 3,
      title: "Cuentas",
      image: cuentas,
      to: '/accounts',
    },
    {
      id: 4,
      title: "Foro",
      image: mensaje,
      to: '/',
    },
    {
      id: 5,
      title: "Cuenta",
      image: cuenta,
      to: '/profile',
    },
  ];
  const isSmallScreen = window.innerWidth < 541;

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
            <img src="menu.png" className="size-7" alt="" />
          </button>

          <div className="flex items-center w-[50%] h-auto">
            <LinkButton to='/newticket' className='ml-4 max-[767px]:w-[50%]'>
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
            {Menus.map(menu => (
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
              
            ))}
          </ul>

          {/* Caja que contiene el Logo mahekal */}
          <div className="flex items-center flex-col mt-6">
            <img
              src="LogoMahekal.png"
              alt="LogoMahekal"
              className="max-[1025px]:size-28 size-36"
            />
          </div>
          <div className="flex mt-10 justify-end mr-6 items-center">
            <button
              className={`hover:bg-water-blue rounded-md py-2 text-mahekal-brown px-4 flex gap-x-3 text-lg ${
                !open && "invisible"
              }`}
            >
              <img src="logout.png" alt="logout" className="size-6 flex mt-1" />
              Logout
            </button>
          </div>
        </aside>

        {/* Elemento Section */}
        <section className={`bg-light-bone w-screen ${open && "blur-sm max-[542px]:hidden"}`}>
          {children}
        </section>
      </div>
    </>
  );
}
