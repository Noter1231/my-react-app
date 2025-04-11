import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/staff">Staff</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;