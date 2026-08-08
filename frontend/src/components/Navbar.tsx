import "./Navbar.css";

interface NavbarProps {
    onMenuClick: () => void;
}
function Navbar({onMenuClick}: NavbarProps) {
    return (
        <nav className="navbar">
            <button 
            type="button"
            className="menu-button"
            onClick={onMenuClick}
            >
                ☰
            </button>

            <div className="navbar-left">
                <h2>InterviewForgeAI</h2>
            </div>

            <div className="navbar-center">
                <input
                    type="text"
                    placeholder="Search..."
                />
            </div>

            <div className="navbar-right">

                <button>
                    🔔
                </button>

                <button
                    type="button"
                    className="profile-button"
                >
                    NK
                </button>

            </div>

        </nav>
    );
}

export default Navbar;