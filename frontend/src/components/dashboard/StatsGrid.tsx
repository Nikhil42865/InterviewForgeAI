import StatCard from "./StatCard";
import type { StatCardProps } from "./StatCard";

interface StatsGridProps {
    stats: StatCardProps[];
}

const StatsGrid = ({stats}: StatsGridProps) => {
    return (
        <section className="stats-section">
            <h2>Your Progress</h2>
            <div className="stats-grid">
                {
                    stats.map(( stat) =>{
                        return(
                            <StatCard
                                key={stat.title}
                                {...stat}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default StatsGrid;