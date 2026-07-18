import {createContext, useState, useEffect } from "react";
import type {ReactNode } from "react";
import userService from "../services/userService";
import {useNavigate} from "react-router-dom";


interface User {
    id: string;
    email: string;
    name: string;
    bio: string;
}
interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (accessToken: string, refreshToken: string) => Promise<void>
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children}: { children: ReactNode }){
    const[user, setUser] = useState<User | null>(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const login = async (accessToken: string, refreshToken: string) =>{
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const response = await userService.getProfile();

        setUser(response);
        setIsAuthenticated(true);
    }

    const logout = () =>{
         localStorage.removeItem("accessToken");
         localStorage.removeItem("refreshToken");
         setUser(null);
         setIsAuthenticated(false);
         navigate("/login");
    }

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
            isLoading, 
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthProvider};
export default AuthContext;