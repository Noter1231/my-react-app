import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Array<'admin' | 'librarian' | 'user'>;
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Kiểm tra xem có đang trong quá trình kiểm tra auth không
  const isCheckingAuth = user === undefined;

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Lưu lại URL hiện tại để sau khi login có thể redirect về
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


