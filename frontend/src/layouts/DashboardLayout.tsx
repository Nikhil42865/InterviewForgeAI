import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Navbar/>
            <Sidebar/>
            <main className = "main">
                <Outlet/>
            </main>
        </div>
    );
}

export default DashboardLayout;