import { NavLink } from "react-router-dom";

function Sidebar() {
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
            path : "/app/coding-aasessment"
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
        <div>
            <h1>Sidebar</h1>
            {
                menuItems.map((item)=>{
                    return(
                        <NavLink to = {item.path} key = {item.label}>
                            {item.label}
                        </NavLink>
                    );
                })
            }
        </div>

    )
}

export default Sidebar;