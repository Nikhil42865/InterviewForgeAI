import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}

export default DashboardLayout;