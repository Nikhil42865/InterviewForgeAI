import type {FormEvent} from 'react';
import type {RegisterData} from '../types/auth';
import authService from '../services/authService';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
    });
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
        try{
            setIsLoading(true);
            setError("");
            const response = await authService.register(registerData);
            console.log(response);
            navigate("/login");
        }
        catch(error: any){
            setError(error.response?.data?.message || "Registration failed");
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input type = "text" value = {registerData.name} onChange ={(event)=>{handleChange("name", event.target.value)}}/>
            <input type = "email" value = {registerData.email} onChange ={(event)=>{handleChange("email", event.target.value)}}/>
            <input type = "password" value = {registerData.password} onChange ={(event)=>{handleChange("password", event.target.value)}}/>
            <button type = "submit" disabled = {isLoading}>
                {isLoading ? "Creating account..." : "Register"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}

export default RegisterPage;