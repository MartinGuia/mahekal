<<<<<<< HEAD
const Modal = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null;

=======
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children, idUsuario }) => {
  // useEffect(() => {
  //   console.log("ID del usuario seleccionado:", idUsuario);
  // }, [idUsuario]);
  if (!isOpen) return null;
  
>>>>>>> pruebas
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative bg-white rounded-lg shadow-xl w-96 max-[541px]:w-80 max-[281px]:w-60">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;