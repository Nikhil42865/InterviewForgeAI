import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type { FormEvent } from "react";
import type {LoginData} from "../types/auth";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";
function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [loginData, setLoginData] = useState<LoginData>({
        email : "",
        password: "",
    });

    const handleChange = (
        field: keyof LoginData,
        value: string
    )=>{
        setLoginData({
            ...loginData,
            [field]: value,
        });
    };

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try{
            setIsLoading(true);
            setError("");
            const response = await authService.login(loginData);
            const {accessToken, refreshToken} = response.data;
            
            await login(accessToken, refreshToken);
            navigate("/app/dashboard");
        }catch(error: any){
            setError(error.response?.data?.message || "Login failed");
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            <input type = "email" value = {loginData.email} onChange={(event) => {handleChange("email", event.target.value)}}/>
            <input type = "password" value = {loginData.password} onChange={(event) => {handleChange("password", event.target.value)}}/>
            <button type = "submit" disabled = {isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )   
};

export default LoginPage;