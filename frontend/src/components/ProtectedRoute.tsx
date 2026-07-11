import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
        const {isAuthenticated, isLoading} = useAuth();
        if(isLoading){
            return <h1>Loading...</h1>
        }
        if(!isAuthenticated){
            return <Navigate to="/login"/>
        }
        return <Outlet/>
}


export default ProtectedRoute;


