import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>LibraryHub Pro</h1>
      </div>
      <div className="navbar-user">
        <span>Welcome, {user?.name}</span>
        <button onClick={logout}>Đăng xuất</button>
      </div>
    </nav>
  );
};

export default Navbar;
