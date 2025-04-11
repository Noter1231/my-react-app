import axios, { AxiosInstance } from 'axios';
import type { Staff } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class StaffService {
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

  async getStaff(): Promise<ApiResponse<Staff[]>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      return {
        success: true,
        data: staff
      };
    }
    // ... rest of the API call
  }

  async createStaff(staffMember: Omit<Staff, 'id'>): Promise<ApiResponse<Staff>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      const newStaff = {
        ...staffMember,
        id: Date.now().toString()
      };
      staff.push(newStaff);
      localStorage.setItem('staff', JSON.stringify(staff));
      return {
        success: true,
        data: newStaff
      };
    }
    // ... rest of the API call
  }

  async updateStaff(id: string, staffMember: Staff): Promise<ApiResponse<Staff>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      const index = staff.findIndex((s: Staff) => s.id === id);
      if (index !== -1) {
        staff[index] = staffMember;
        localStorage.setItem('staff', JSON.stringify(staff));
        return {
          success: true,
          data: staffMember
        };
      }
      return {
        success: false,
        error: 'Không tìm thấy nhân viên'
      };
    }
    // ... rest of the API call
  }

  async deleteStaff(id: string): Promise<ApiResponse<void>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      const filteredStaff = staff.filter((s: Staff) => s.id !== id);
      localStorage.setItem('staff', JSON.stringify(filteredStaff));
      return {
        success: true
      };
    }
    // ... rest of the API call
  }
}

export const staffService = new StaffService();

