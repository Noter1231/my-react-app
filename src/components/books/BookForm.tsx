import { useState } from 'react';
import { apiService } from '../../services/api';
import { Book } from '../../types';
import '../common/ModalForm.css';

interface BookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const BookForm = ({ onSuccess, onCancel }: BookFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedYear: new Date().getFullYear(),
    category: 'Fiction',
    quantity: 1,
    description: '',
    imageUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.createBook(formData);
      if (response.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Không thể thêm sách:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thêm sách mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageUrl">URL ảnh bìa sách</label>
            <input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://example.com/book-cover.jpg"
            />
            {formData.imageUrl && (
              <div className="image-preview">
                <img src={formData.imageUrl} alt="Xem trước ảnh bìa" onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=No+Image';
                }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="title">Tên sách</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Tác giả</label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="publisher">Nhà xuất bản</label>
            <input
              id="publisher"
              type="text"
              value={formData.publisher}
              onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Năm xuất bản</label>
            <input
              id="publishedYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.publishedYear}
              onChange={(e) => setFormData({...formData, publishedYear: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Thể loại</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="Programming">Lập trình</option>
              <option value="Fiction">Tiểu thuyết</option>
              <option value="Science">Khoa học</option>
              <option value="Business">Kinh doanh</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Số lượng</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Đang thêm...' : 'Thêm sách'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;





