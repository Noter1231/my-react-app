import { Book } from '../../types';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './BookTable.css';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookTable = ({ books, onEdit, onDelete }: BookTableProps) => {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có sách nào trong thư viện</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Ảnh bìa</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Năm xuất bản</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td className="book-image">
                {book.imageUrl ? (
                  <img 
                    src={book.imageUrl} 
                    alt={`Bìa sách ${book.title}`}
                    className="book-cover"
                  />
                ) : (
                  <div className="no-image">
                    Chưa có ảnh
                  </div>
                )}
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.quantity}</td>
              <td>{book.publishedYear}</td>
              <td className="actions">
                <button 
                  className="action-button edit"
                  onClick={() => onEdit(book)}
                  title="Sửa"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => onDelete(book.id)}
                  title="Xóa"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;



