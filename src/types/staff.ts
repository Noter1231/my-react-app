export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'librarian' | 'assistant';
  status: 'active' | 'inactive';
  joinDate: string;
}

export type StaffFormData = Omit<Staff, 'id' | 'joinDate'>;