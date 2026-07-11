import {createContext, useState, useEffect } from "react";
import type {ReactNode } from "react";
import userService from "../services/userService";

interface User {
    id: string;
    email: string;
    name: string;
}
interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children}: { children: ReactNode }){
    const[user, setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const loadUser = async () =>{
            const token = localStorage.getItem("accessToken");
            if(!token){
                setIsLoading(false);
                return;
            }
            try{
                const response= await userService.getProfile();
                setUser(response.data);
                setIsAuthenticated(true);
            }
            catch(error){
                console.error("Failed to fetch user", error);
            }
            finally{
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);
    return (
        <AuthContext.Provider value={{
            user, 
            isAuthenticated,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthProvider};
export default AuthContext;