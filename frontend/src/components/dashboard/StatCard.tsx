import type { ReactNode } from "react";
import "./StatCard.css";

export interface StatCardProps{
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
}

const StatCard = ({title, value, description, icon}: StatCardProps)=>{
    return (
        <section className="stat-card">
            {icon && (
                <div className="stat-icon">
                    {icon}
                </div>
            )}

            <h3>{title}</h3>

            <p className="stat-value">{value}</p>

            {description && (
                <p className="stat-description">{description}</p>
            )}
        </section>
    );
}

export default StatCard;