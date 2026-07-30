import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

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

                <div className="profile">
                    NK
                </div>

            </div>

        </nav>
    );
}

export default Navbar;