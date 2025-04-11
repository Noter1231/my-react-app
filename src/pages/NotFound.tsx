import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link to="/" className="back-home">
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;