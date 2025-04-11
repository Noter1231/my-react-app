import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Handle signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      setError('Đã có lỗi xảy ra khi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <i className="fas fa-user-plus"></i>
        </div>
        <h2>Đăng ký</h2>
        
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
              placeholder="Tên người dùng"
              required
            />
            <i className="fas fa-user"></i>
          </div>

          <div className="form-group">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
              required
            />
            <i className="fas fa-envelope"></i>
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

          <div className="form-group">
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Xác nhận mật khẩu"
              required
            />
            <i className="fas fa-lock"></i>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                ĐANG ĐĂNG KÝ
                <span className="loading-spinner"></span>
              </>
            ) : (
              'ĐĂNG KÝ'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login" className="auth-link">
            <i className="fas fa-sign-in-alt"></i> Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;




