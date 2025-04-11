interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}

const NotificationPanel = () => {
  return (
    <div className="notification-panel">
      <h3>Thông báo</h3>
      <div className="notifications-list">
        {/* Add notifications here */}
      </div>
    </div>
  );
};

export default NotificationPanel;