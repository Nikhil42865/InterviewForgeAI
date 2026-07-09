import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type { FormEvent } from "react";
import type {LoginData} from "../types/auth";
import authService from "../services/authService";
function LoginPage() {
    const navigate = useNavigate();

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
        const response = await authService.login(loginData);
        const {accessToken, refreshToken} = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(response);
        navigate("/app/dashboard");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            <input type = "email" value = {loginData.email} onChange={(event) => {handleChange("email", event.target.value)}}/>
            <input type = "password" value = {loginData.password} onChange={(event) => {handleChange("password", event.target.value)}}/>
            <button type = "submit">Login</button>
        </form>
    )   
};

export default LoginPage;