import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import type { Book } from '../../types';

interface BookListProps {
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList = ({ onEdit, onDelete }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiService.getBooks();
      if (response.success && response.data) {
        setBooks(response.data);
      } else {
        setError(response.error || 'Failed to fetch books');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={() => onEdit(book)}>Edit</button>
                  <button onClick={() => onDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;

