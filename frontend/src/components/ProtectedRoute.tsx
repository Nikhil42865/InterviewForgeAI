import { Outlet, Navigate } from "react-router-dom";


function ProtectedRoute() {
        const isAuthenticated = localStorage.getItem("accessToken");
        if(isAuthenticated){
            return <Outlet/>
        }
        return <Navigate to="/login"/>
}


export default ProtectedRoute;


