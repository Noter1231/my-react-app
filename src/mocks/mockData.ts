import { Book, Customer } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    quantity: 5,
    category: 'Programming',
    publishedYear: 2008,
    description: 'A Handbook of Agile Software Craftsmanship'
  },
  {
    id: '2',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    isbn: '9780201633610',
    quantity: 3,
    category: 'Programming',
    publishedYear: 1994,
    description: 'Elements of Reusable Object-Oriented Software'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: 'Hà Nội',
    membershipDate: '2024-01-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    address: 'Hồ Chí Minh',
    membershipDate: '2024-01-02',
    status: 'active'
  }
];