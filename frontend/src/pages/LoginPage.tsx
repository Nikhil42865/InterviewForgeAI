import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import type { FormEvent } from "react";
import type {LoginData} from "../types/auth";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";
import "./styles/LoginPage.css";
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
       <div className="login-page">
            <section className = "login-branding">
                <div className="brand-name">InterviewForgeAI</div>
                <h2>Prepare smarter.<br/>
                    Interview Smarter.
                </h2>
                <p>Practice real interviews, improve your answers, and track your progress with AI-powered feedback.</p>
            </section>
            <section className = "login-form-section">
                 <form className= "login-form" onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                    <input type = "email" id="email" value = {loginData.email} onChange={(event) => {handleChange("email", event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type = "password" id="password" value = {loginData.password} onChange={(event) => {handleChange("password", event.target.value)}}/>
                    </div>
                    <button type = "submit" disabled = {isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="login-error">{error}</p>}
                    <Link to = "/register">Don't have an account? Register</Link>
                </form>
            </section>
       </div>
    )   
};

export default LoginPage;