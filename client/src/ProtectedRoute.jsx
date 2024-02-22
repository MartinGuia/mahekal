// Este componente permite seleccionar que datos "existen" al ser logueado y que continue, si no que redireccione
import { useAuth } from "./context/AuthContex"
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const {loading, user, isAuthenticated} = useAuth();
    console.log(loading,isAuthenticated);

    if(loading)return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/' replace/>

  return <Outlet />;
}

export default ProtectedRoute