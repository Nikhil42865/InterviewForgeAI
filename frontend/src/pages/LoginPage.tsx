import {useState} from "react";
import type {LoginData} from "../types/auth";
function LoginPage() {
    const [login, setLogin] = useState<LoginData>({
        email : "",
        password: "",
    })
    return (
        <h1>Login Page</h1>
    )
};

export default LoginPage;