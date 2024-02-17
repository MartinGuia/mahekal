import React from 'react'
import { Link } from 'react-router-dom';
import {clsx} from "clsx" 

const CustomLink = ({ to, className, children, ...rest }) => {
    // Renderiza el enlace utilizando las props recibidas
    return (
      <Link
        to={to}
        className={clsx(
          "flex justify-center w-auto p-3 h-auto duration-500 rounded-lg shadow-md bg-water-blue hover:bg-water-blue-hover ",
          className
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  };

function LinkButton(props) {
  return (
      <CustomLink {...props}>
      </CustomLink>
  )
}

export default LinkButton
