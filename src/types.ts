export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: string;
  status: 'active' | 'inactive';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  quantity: number;
  publishedYear: number;
  imageUrl?: string;
  description?: string;
}
