export interface User {
  id: string;
  name: string;
  role: 'admin' | 'librarian' | 'user';
  token?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  category: string;
  publishedYear: number;
  description?: string;
  publisher?: string;
  imageUrl?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'librarian';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: string;
  membershipType?: string;
  status: 'active' | 'inactive';
}

export interface Borrowing {
  id: string;
  bookId: string;
  customerId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  staffId: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
}

