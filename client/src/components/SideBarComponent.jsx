import { useState } from "react";
import tickets from '../img/boleto.png'
import dptos from '../img/departamento.png'
import cuentas from '../img/agregar-usuario.png'
import mensaje from '../img/mensaje.png'
import cuenta from '../img/usuario.png'

function SideBarComponent() {
    const [open, setOpen] = useState(true);
    const toggleSidebar = () =>{
      setOpen(!open)
    }
    const Menus =[
      {
          title: 'Tickets',
          image: tickets,
      },
      {
          title: 'Departamentos',
          image: dptos,
      },
      {
          title: 'Cuentas',
          image: cuentas,
      },
      {
          title: 'Foro',
          image: mensaje,
      },
      {
          title: 'Cuenta',
          image: cuenta,
      },
  ]

  return (

    //TODO: caja principal que engloba todos los elementos
    <div className="h-screen flex items-end justify-end">

      {/* Boton para desplegar el menu */}
      <button
        className="fixed lg:hidden z-90 bottom-10 right-10 bg-water-blue 
        w-10 h-10 rounded-full drop-shadow-md flex justify-center items-center text-white
        text-4xl hover:bg-cyan-600 duration-300" onClick={toggleSidebar}
      >
        <img className="size-8" src="menu.png" alt="menu" />
      </button>

      {/* Caja que engloba el elemento de la tarjeta principal */}
      <div className={`${open ? "w-48" : "max-w-0" } lg:w-72 w-48 bg-white h-screen shadow-xl relative`}>
        
        {/* caja que engloba los elementos del titulo y hr:linea inferior del titulo */}
        <div className="justify-center mt-3">
          <h1 className={`text-mahekal-brown font-medium text-4xl text-center duration-0 ${!open && 'invisible'}`}>Mahekal</h1>
          <hr className={`w-auto mx-5 mt-1.5 border-mahekal-brown duration-0 ${!open && 'invisible'}`}/>
        </div>

        {/* Lista de elementos para el menu */}
        <ul className="pt-4">
          {Menus.map((menu, i)=>(
            <>
                <li key={i} className={`flex rounded-md p-3 mt-2  cursor-pointer hover:bg-water-blue items-center gap-x-3 `}>
                <img src={menu.image} className="size-8" />
                <span className={`flex-1 duration-0 text-mahekal-brown text-lg font-normal ${!open && 'invisible'}`}>
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>

        {/* Este div es para el Logo mahekal */}
        <div className="flex items-center flex-col mt-6">
          <img src="LogoMahekal.png" alt="LogoMahekal" className="max-[431px]:size-28 size-36"/>
        </div>

        <div className="flex mt-10 justify-end mr-6 items-center">
            <button className={`hover:bg-water-blue rounded-md py-2 text-mahekal-brown px-4 flex gap-x-3 text-lg ${!open && 'invisible'}`}>
            <img src="logout.png" alt="logout" className="size-6 flex mt-1"/>
              Logout
            </button>
        </div>
      </div>
    </div>
  );
}

export default SideBarComponent