import React from 'react';
import {clsx} from "clsx" 

const ButtonAction = ({ className, rutaDestino, children }) => {

  const handleClick = () => {
    // Redireccionar a la ruta de destino
    window.location.href = rutaDestino;
  };

  return (
    <button className={clsx(
        "flex justify-center w-auto p-3 h-auto duration-500 rounded-lg shadow-md bg-slate-500 hover:bg-slate-600",
        className
      )} onClick={handleClick}>
      {children}
    </button>
  );
};

export default ButtonAction;