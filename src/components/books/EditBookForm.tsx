import { useState } from 'react';
import { Book } from '../../types';
import './EditBookForm.css';

interface EditBookFormProps {
  book: Book;
  onSuccess: (updatedBook: Book) => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    quantity: book.quantity,
    publishedYear: book.publishedYear,
    description: book.description || '',
    imageUrl: book.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData as Book);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'publishedYear' ? parseInt(value) : value
    }));
  };

  return (
    <div className="edit-book-overlay">
      <div className="edit-book-modal">
        <button className="close-btn" onClick={onCancel}>&times;</button>
        
        <h2>Chỉnh sửa thông tin sách</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>URL ảnh bìa sách</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
            />
            {formData.imageUrl && (
              <div className="image-preview">
                <img 
                  src={formData.imageUrl} 
                  alt="Xem trước ảnh bìa" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=No+Image';
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Tên sách</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tác giả</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Thể loại</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Programming">Lập trình</option>
              <option value="Fiction">Tiểu thuyết</option>
              <option value="Science">Khoa học</option>
              <option value="Business">Kinh doanh</option>
            </select>
          </div>

          <div className="form-group">
            <label>Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Năm xuất bản</label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button type="submit" className="save-btn">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;



