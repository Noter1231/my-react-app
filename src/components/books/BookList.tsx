import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import type { Book } from '../../types';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiService.getBooks();
      if (response.success) {
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

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await apiService.deleteBook(id);
      if (response.success) {
        setBooks(books.filter(book => book.id !== id));
      } else {
        setError(response.error || 'Failed to delete book');
      }
    } catch (err) {
      setError('Failed to delete book');
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
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
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
