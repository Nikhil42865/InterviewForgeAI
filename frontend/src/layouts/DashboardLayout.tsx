import { Outlet } from "react-router-dom";
import {useState} from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };
    return (
        <div className="dashboard-layout">
            <Navbar onMenuClick={toggleSidebar}/>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
            <main className = "main">
                <Outlet/>
            </main>
        </div>
    );
}

export default DashboardLayout;