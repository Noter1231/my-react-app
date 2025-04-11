import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import BookTable from '../components/books/BookTable';
import BookForm from '../components/books/BookForm';
import EditBookForm from '../components/books/EditBookForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Book } from '../types';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBooks();
      if (response.success && response.data) {
        setBooks(response.data);
      } else {
        setError(response.error || 'Không thể tải danh sách sách');
      }
    } catch (err) {
      console.error('Books page error:', err);
      setError('Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleEditSubmit = async (book: Book) => {
    try {
      const response = await apiService.updateBook(book.id, book);
      if (response.success) {
        await fetchBooks();
        setEditingBook(null);
      } else {
        setError(response.error || 'Không thể cập nhật sách');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật sách');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      try {
        const response = await apiService.deleteBook(id);
        if (response.success) {
          await fetchBooks();
        } else {
          setError(response.error || 'Không thể xóa sách');
        }
      } catch (err) {
        console.error('Delete error:', err);
        setError('Đã xảy ra lỗi khi xóa sách');
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Quản lý sách</h1>
        <button 
          className="add-button"
          onClick={() => setIsFormOpen(true)}
        >
          + Thêm sách mới
        </button>
      </div>

      {isFormOpen && (
        <BookForm
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={(updatedBook) => {
            handleEditSubmit(updatedBook);
            setEditingBook(null);
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sách, tác giả hoặc ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <BookTable
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Books;

