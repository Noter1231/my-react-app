import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import './Header.css';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
}

const Header = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock data - sau này sẽ được thay thế bằng dữ liệu thật từ API
  const notifications: Notification[] = [
    {
      id: '1',
      message: 'Độc giả Nguyễn Văn A đã trả sách trễ hạn',
      type: 'warning',
      timestamp: '2 giờ trước'
    },
    {
      id: '2',
      message: 'Sách "Clean Code" sắp hết hàng',
      type: 'info',
      timestamp: '5 giờ trước'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current && 
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    logout();
    // Sau khi logout, người dùng sẽ được redirect về trang login
    // nhờ vào ProtectedRoute component
  };

  return (
    <header className="header">
      <div className="header-left">
  
      </div>
      
      <div className="header-right">
        <div className="notifications-wrapper" ref={notificationsRef}>
          <div className="notifications" onClick={toggleNotifications}>
            <FiBell className="icon" />
            <span className="notification-badge">2</span>
          </div>
          
          {showNotifications && (
            <div className="notifications-popup">
              <div className="notifications-header">
                <h3>Thông báo</h3>
                <span className="notifications-count">{notifications.length} mới</span>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.type}`}>
                    <div className="notification-content">
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="mark-all-read">Đánh dấu tất cả đã đọc</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="user-menu">
          <div className="user-info">
            <div className="avatar">
              <FiUser className="avatar-icon" />
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


