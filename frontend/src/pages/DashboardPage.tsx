import useAuth from "../hooks/useAuth";
import type {StatCardProps} from "../components/dashboard/StatCard"
import StatsGrid from "../components/dashboard/StatsGrid"
import "./styles/DashboardPage.css";

const stats: StatCardProps[] = [
    {
        title: "Total Interviews",
        value: 12,
        description: "3 this month",
        icon: "🎤",
    },
    {
        title: "Average Score",
        value: "78%",
        description: "8% improvement",
        icon: "📊",
    },
    {
        title: "Resumes",
        value: 4,
        description: "2 active",
        icon: "📄",
    },
    {
        title: "Coding Tests",
        value: 18,
        description: "5 this month",
        icon: "💻",
    },
];
function DashboardPage() {
    const {user} = useAuth();
    
     return (
        <div className="dashboard-page">

            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>
                        Track your interview preparation and keep improving.
                    </p>
                </div>
            </header>

            <StatsGrid stats={stats} />

            <section className="quick-actions">
                <h2>Quick Actions</h2>

                {/* actions will go here */}
            </section>

            <section className="recent-interviews">
                <h2>Recent Interviews</h2>

                {/* interviews will go here */}
            </section>

            <section className="recent-activity">
                <h2>Recent Activity</h2>

                {/* activity will go here */}
            </section>

        </div>
    );
};

export default DashboardPage;