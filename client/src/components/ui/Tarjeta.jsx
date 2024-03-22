import { Link } from 'react-router-dom'
import {clsx} from "clsx" 

const CustomLink = ({ to, className, children, ...rest }) => {
  // Renderiza el enlace utilizando las props recibidas
  return (
    <Link to={to} className={clsx('hover:-translate-y-2 hover:shadow-2xl duration-500 flex w-[45%] h-auto my-3 p-2 shadow-xl border-mahekal-brown border-2 rounded-2xl bg-white max-[1025px]:w-[65%] max-[1281px]:w-auto max-[1281px]:h-auto max-[541px]:w-[80%] max-[541px]:text-base max-[541px]:flex-col max-[281px]:text-xs', className)} {...rest}>
      {children}
    </Link>
  );
};

export function Tarjeta(props) {
  return (
    <CustomLink {...props}></CustomLink>
  )
}


