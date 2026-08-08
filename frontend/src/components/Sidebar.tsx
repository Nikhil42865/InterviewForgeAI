import { NavLink } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps{
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({isOpen, onClose}: SidebarProps) {

    const menuItems =[
        {
            label : "Dashboard",
            path : "/app/dashboard"
        },
        {
            label : "Resume",
            path : "/app/resume"
        },
        {
            label : "Interview",
            path : "/app/interview"
        },
        {
            label : "Coding assessment",
            path : "/app/coding-assessment"
        },
        {
            label : "Analytics",
            path : "/app/analytics"
        },
        {
            label : "Settings",
            path : "/app/settings"
        },
    ];
    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <h1>Sidebar</h1>
            {
                menuItems.map((item)=>{
                    return(
                        <NavLink to = {item.path} key = {item.label} className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
                            {item.label}
                        </NavLink>
                    );
                })
            }
        </aside>

    )
}

export default Sidebar;