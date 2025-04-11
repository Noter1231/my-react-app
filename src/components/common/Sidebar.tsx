import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Hệ thống Quản lý Thư viện</h1>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <i className="icon-dashboard"></i>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/books" 
          className={`nav-item ${isActive('/books') ? 'active' : ''}`}
        >
          <i className="icon-books"></i>
          <span>Books Management</span>
        </Link>
        
        <Link 
          to="/staff" 
          className={`nav-item ${isActive('/staff') ? 'active' : ''}`}
        >
          <i className="icon-staff"></i>
          <span>Staff Management</span>
        </Link>
        
        <Link 
          to="/customers" 
          className={`nav-item ${isActive('/customers') ? 'active' : ''}`}
        >
          <i className="icon-customers"></i>
          <span>Customer Management</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;