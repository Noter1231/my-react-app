import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize mock data if not exists
const initializeMockData = () => {
  // Kiểm tra nếu chưa có dữ liệu mẫu thì mới khởi tạo
  if (!localStorage.getItem('books')) {
    const initialBooks = [
      {
        id: '1',
        title: 'Sách mẫu 1',
        author: 'Tác giả 1',
        isbn: 'ISBN-001',
        quantity: 10,
        category: 'Văn học',
        publishedYear: 2023
      },
      // Thêm vài cuốn sách mẫu khác
    ];
    localStorage.setItem('books', JSON.stringify(initialBooks));
  }
};

initializeMockData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



