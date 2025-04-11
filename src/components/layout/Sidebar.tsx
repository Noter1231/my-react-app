import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaChartLine, FaBook, FaUsers, FaUserTie } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>LibraryHub Pro</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaChartLine />
          <span>Dashboard</span>
        </NavLink>

        {(user?.role === 'admin' || user?.role === 'librarian') && (
          <>
            <NavLink to="/books" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaBook />
              <span>Books</span>
            </NavLink>
            
            <NavLink to="/customers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaUsers />
              <span>Customers
              </span>
            </NavLink>
          </>
        )}

        {user?.role === 'admin' && (
          <NavLink to="/staff" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FaUserTie />
            <span>Staff</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

