import { FaBook, FaClock, FaUsers, FaExclamationCircle } from 'react-icons/fa';
import DashboardCard from './DashboardCard';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tổng quan hệ thống</h1>
        <p>Xin chào! Đây là tổng quan hoạt động của thư viện trong tuần qua</p>
      </div>

      <div className="stats-grid">
        <DashboardCard
          title="TỔNG SỐ SÁCH"
          value="1250"
          trend="+5.2%"
          icon={<FaBook />}
          color="#1976d2"
        />

        <DashboardCard
          title="ĐANG MƯỢN"
          value="45"
          trend="+2.4%"
          icon={<FaClock />}
          color="#2e7d32"
        />

        <DashboardCard
          title="TỔNG ĐỘC GIẢ"
          value="380"
          trend="+8.1%"
          icon={<FaUsers />}
          color="#f57c00"
        />

        <DashboardCard
          title="QUÁ HẠN"
          value="12"
          trend="-1.2%"
          icon={<FaExclamationCircle />}
          color="#c62828"
        />
      </div>
    </div>
  );
};

export default Dashboard;


