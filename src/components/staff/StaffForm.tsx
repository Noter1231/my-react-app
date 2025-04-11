import { useState } from 'react';
import { staffService } from '../../services/staffService';
import type { Staff } from '../../types';
import '../common/ModalForm.css';

interface StaffFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const StaffForm = ({ onSuccess, onCancel }: StaffFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'librarian',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await staffService.createStaff(formData);
      if (response.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create staff:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thêm nhân viên mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ tên</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="librarian">Thủ thư</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Thêm nhân viên</button>
            <button type="button" onClick={onCancel} className="cancel-button">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;



