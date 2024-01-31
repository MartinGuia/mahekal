import React, { useState } from "react";
import tickets from "../img/boleto.png";
import dptos from "../img/departamento.png";
import cuentas from "../img/agregar-usuario.png";
import mensaje from "../img/mensaje.png";
import cuenta from "../img/usuario.png";

export default function Nav(props) {
  const [open, setOpen] = useState(true);

  const toggleAside = () => {
    setOpen(!open);
  };

  const Menus = [
    {
      title: "Tickets",
      image: tickets,
    },
    {
      title: "Departamentos",
      image: dptos,
    },
    {
      title: "Cuentas",
      image: cuentas,
    },
    {
      title: "Foro",
      image: mensaje,
    },
    {
      title: "Cuenta",
      image: cuenta,
    },
  ];

  return (
    <>
      {/* menu de navegacion superior */}
      <nav className=" bg-slate-300 h-16 ">sola</nav>

      {/* Contenedor que tiene asid y section */}
      <div className="flex h-dvh flex-row">
        {/* Elemento aside */}
        <aside
          id="myAside"
          className={` bg-slate-400 ${
            open ? " md:block w-60 " : "hidden"
          } md:block `}
        >
          <div className="justify-center mt-3">
            <h1
              className={`text-mahekal-brown font-medium text-4xl text-center duration-0 ${
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

          <ul className="pt-4">
            {Menus.map((menu, i) => (
              <>
                <li
                  key={i}
                  className={`flex rounded-md p-3 mt-2  cursor-pointer hover:bg-water-blue items-center gap-x-3 `}
                >
                  <img src={menu.image} className="size-8" />
                  <span
                    className={`flex-1 duration-0 text-mahekal-brown text-lg font-normal ${
                      !open && "invisible"
                    }`}
                  >
                    {menu.title}
                  </span>
                </li>
              </>
            ))}
          </ul>
        </aside>

        

        {/* Elemento Section */}
        <section className=" bg-slate-500 w-screen  ">
          {props.component}
        </section>

        <button
          onClick={toggleAside}
          className=" fixed md:hidden bg-gray-100 bottom-5 right-5 p-5"
          id="buttonAside"
        >
          click
        </button>
      </div>
    </>
  );
}
