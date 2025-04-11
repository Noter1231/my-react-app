import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Books from './pages/Books';
import StaffPage from './pages/Staff';
import Customers from './pages/Customers';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="books" element={
              <ProtectedRoute requiredRoles={['admin', 'librarian']}>
                <Books />
              </ProtectedRoute>
            } />
            <Route path="staff" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <StaffPage />
              </ProtectedRoute>
            } />
            <Route path="customers" element={
              <ProtectedRoute requiredRoles={['admin', 'librarian']}>
                <Customers />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


