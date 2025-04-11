import React from 'react';
import { IconType } from 'react-icons';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: IconType;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        <Icon size={24} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;


