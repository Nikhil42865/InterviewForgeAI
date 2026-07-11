import userService from "../services/userService";

function DashboardPage() {
    const testProfile = async()=>{
        const response = await userService.getProfile();
        console.log(response);
    };

    return (
        <div>
            <h1>Dashboard Page</h1>
            <button onClick={testProfile}>
                Get Profile
            </button>
        </div>
    )
};

export default DashboardPage;