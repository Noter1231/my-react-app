import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import './DashboardCard.css';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  color: string;
  trendIcon?: React.ReactNode;
}

const DashboardCard = ({ 
  title, 
  value, 
  trend, 
  icon, 
  color 
}: DashboardCardProps) => {
  const isTrendUp = trend.startsWith('+');

  return (
    <div className="dashboard-card" style={{ '--card-color': color } as React.CSSProperties}>
      <div className="card-icon">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-value">{value}</p>
        <div className={`card-trend ${isTrendUp ? 'trend-up' : 'trend-down'}`}>
          {isTrendUp ? <FaCaretUp /> : <FaCaretDown />}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

