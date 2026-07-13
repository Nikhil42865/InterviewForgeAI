import userService from "../services/userService";
import useAuth from "../hooks/useAuth";

function DashboardPage() {
    const testProfile = async()=>{
        const response = await userService.getProfile();
        console.log(response);
    };
    const {logout} = useAuth();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <button onClick={testProfile}>
                Get Profile
            </button>
            <br/>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
};

export default DashboardPage;