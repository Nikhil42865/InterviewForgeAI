import { Outlet, Navigate } from "react-router-dom";

const isAuthenticated = true;
function ProtectedRoute() {
        if(isAuthenticated){
            return <Outlet/>
        }
        return <Navigate to="/login"/>
}


export default ProtectedRoute;


