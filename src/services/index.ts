import axios from 'axios';
import StaffService from './staffService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const staffService = new StaffService(api);