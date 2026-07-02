import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div>
            Navbar
            Sidebar
            <Outlet/>
        </div>
    );
}

export default DashboardLayout;