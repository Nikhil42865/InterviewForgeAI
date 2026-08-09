import type {FormEvent} from 'react';
import type {RegisterData} from '../types/auth';
import authService from '../services/authService';
import useAuth from '../hooks/useAuth';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/auth.css';

function RegisterPage() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        field: keyof RegisterData,
        value: string
    )=>{
        setRegisterData({
            ...registerData,
            [field]: value,
        });
    };

    const handleSubmit = async(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        setError("");

        if(confirmPassword !== registerData.password && confirmPassword !== ""){
            setError("Passwords do not match");
            return;
        }
        try{
            setIsLoading(true);
            const response = await authService.register(registerData);
            const {accessToken, refreshToken} = response.data;
            await login(accessToken, refreshToken);
            navigate("/app/dashboard");
        }
        catch(error: any){
            setError(error.response?.data?.message || "Registration failed");
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="auth-page">
            <section className = "auth-branding">
                <div className="brand-name">InterviewForgeAI</div>
                 <h2>Prepare smarter.<br/>
                    Interview Smarter.
                </h2>
                <p>Practice real interviews, improve your answers, and track your progress with AI-powered feedback.</p>
            </section>
            <section className="auth-form-section">
                <form className="auth-form"onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type = "text" id="name" value = {registerData.name} onChange ={(event)=>{handleChange("name", event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type = "email" id="email" value = {registerData.email} onChange ={(event)=>{handleChange("email", event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type = "password" id="password" value = {registerData.password} onChange ={(event)=>{handleChange("password", event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type = "password" id="confirmPassword" value = {confirmPassword} onChange ={(event)=>{setConfirmPassword(event.target.value)}}/>
                    </div>
                    <button type = "submit" disabled = {isLoading}>
                        {isLoading ? "Creating account..." : "Register"}
                    </button>
                    {error && <p className="auth-error">{error}</p>}
                    <Link to = "/login">Already have an account? Login</Link>
                </form>
            </section>
        </div>
    )
}

export default RegisterPage;