import { AxiosInstance } from 'axios';
import type { Staff, ApiResponse } from '../types';

export class StaffService {
  private api: AxiosInstance;
  private useMockData = true;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getStaff(): Promise<ApiResponse<Staff[]>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      return {
        success: true,
        data: staff
      };
    }
    return {
      success: false,
      error: 'Not implemented'
    };
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
    return {
      success: false,
      error: 'Not implemented'
    };
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
    }
    return {
      success: false,
      error: 'Staff member not found'
    };
  }

  async deleteStaff(id: string): Promise<ApiResponse<void>> {
    if (this.useMockData) {
      const staff = JSON.parse(localStorage.getItem('staff') || '[]');
      const filtered = staff.filter((s: Staff) => s.id !== id);
      localStorage.setItem('staff', JSON.stringify(filtered));
      return {
        success: true
      };
    }
    return {
      success: false,
      error: 'Not implemented'
    };
  }
}

export default new StaffService(null as any);


