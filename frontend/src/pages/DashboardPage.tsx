import userService from "../services/userService";
import useAuth from "../hooks/useAuth";

function DashboardPage() {
    const {user, logout} = useAuth();
    console.log(user);
    return (
        <div>
            <h1>Dashboard Page</h1>
            <h2>Welcome, {user?.name}!</h2>
            <h3>Email: {user?.email}</h3>
            <p>Bio: {user?.bio}</p>
            <br/>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
};

export default DashboardPage;