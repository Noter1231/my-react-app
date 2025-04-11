import axios, { AxiosInstance } from 'axios';
import type { Book, Customer } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private api: AxiosInstance;
  private useMockData = true;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 10000,
    });
  }

  // Books API
  async getBooks(): Promise<ApiResponse<Book[]>> {
    if (this.useMockData) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      return {
        success: true,
        data: books
      };
    }

    try {
      const response = await this.api.get('/books');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get books error:', error);
      return {
        success: false,
        error: 'Không thể lấy danh sách sách'
      };
    }
  }

  async createBook(book: Omit<Book, 'id'>): Promise<ApiResponse<Book>> {
    if (this.useMockData) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      const newBook = {
        ...book,
        id: Date.now().toString()
      };
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
      return {
        success: true,
        data: newBook
      };
    }

    try {
      const response = await this.api.post('/books', book);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Create book error:', error);
      return {
        success: false,
        error: 'Không thể tạo sách mới'
      };
    }
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<ApiResponse<Book>> {
    if (this.useMockData) {
      try {
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        const index = books.findIndex((book: Book) => book.id === id);
        
        if (index === -1) {
          return {
            success: false,
            error: 'Không tìm thấy sách'
          };
        }

        // Giữ lại ID và cập nhật các trường khác
        const updatedBook = {
          ...books[index],
          ...bookData,
          id // Đảm bảo ID không bị thay đổi
        };

        books[index] = updatedBook;
        localStorage.setItem('books', JSON.stringify(books));

        return {
          success: true,
          data: updatedBook
        };
      } catch (error) {
        console.error('Update book error:', error);
        return {
          success: false,
          error: 'Lỗi khi cập nhật sách'
        };
      }
    }

    // Xử lý API thật ở đây
    try {
      const response = await this.api.put(`/books/${id}`, bookData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Update book error:', error);
      return {
        success: false,
        error: 'Không thể cập nhật sách'
      };
    }
  }

  async deleteBook(id: string): Promise<ApiResponse<void>> {
    if (this.useMockData) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      const filteredBooks = books.filter((b: Book) => b.id !== id);
      localStorage.setItem('books', JSON.stringify(filteredBooks));
      return {
        success: true
      };
    }

    try {
      await this.api.delete(`/books/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Không thể xóa sách' };
    }
  }

  // Customers API
  async getCustomers(): Promise<ApiResponse<Customer[]>> {
    if (this.useMockData) {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      return {
        success: true,
        data: customers
      };
    }

    try {
      const response = await this.api.get('/customers');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get customers error:', error);
      return {
        success: false,
        error: 'Không thể tải danh sách độc giả'
      };
    }
  }

  async createCustomer(customer: Omit<Customer, 'id'>): Promise<ApiResponse<Customer>> {
    if (this.useMockData) {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const newCustomer = {
        ...customer,
        id: Date.now().toString()
      };
      customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(customers));
      return {
        success: true,
        data: newCustomer
      };
    }

    try {
      const response = await this.api.post('/customers', customer);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Không thể tạo độc giả mới'
      };
    }
  }

  async updateCustomer(id: string, customer: Customer): Promise<ApiResponse<Customer>> {
    if (this.useMockData) {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const index = customers.findIndex((c: Customer) => c.id === id);
      if (index !== -1) {
        customers[index] = customer;
        localStorage.setItem('customers', JSON.stringify(customers));
        return {
          success: true,
          data: customer
        };
      }
      return {
        success: false,
        error: 'Không tìm thấy độc giả'
      };
    }

    try {
      const response = await this.api.put(`/customers/${id}`, customer);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Không thể cập nhật độc giả'
      };
    }
  }

  async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    if (this.useMockData) {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const filteredCustomers = customers.filter((c: Customer) => c.id !== id);
      localStorage.setItem('customers', JSON.stringify(filteredCustomers));
      return {
        success: true
      };
    }

    try {
      await this.api.delete(`/customers/${id}`);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Không thể xóa độc giả'
      };
    }
  }
}

export const apiService = new ApiService();





