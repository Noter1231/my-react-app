import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  
  // Lấy đường dẫn redirect từ state, mặc định là '/'
  const from = (location.state as any)?.from || '/';

  useEffect(() => {
    // Nếu đã đăng nhập, redirect về trang được yêu cầu
    if (user) {
      navigate(from, { replace: true });
    }

    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, [user, navigate, from]);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      // Login thành công sẽ tự động redirect nhờ vào useEffect ở trên
    } catch (error) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <i className="fas fa-book-reader"></i>
        </div>
        <h2>Đăng nhập</h2>
        <p className="welcome-text">
          Chào mừng bạn đến với Hệ thống Quản lý Thư viện
        </p>
        
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Tên đăng nhập"
              required
            />
            <i className="fas fa-user"></i>
          </div>

          <div className="form-group">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Mật khẩu"
              required
            />
            <i className="fas fa-lock"></i>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                ĐANG ĐĂNG NHẬP
                <span className="loading-spinner"></span>
              </>
            ) : (
              'ĐĂNG NHẬP'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/signup" className="auth-link">
            <i className="fas fa-user-plus"></i> Chưa có tài khoản? Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
















