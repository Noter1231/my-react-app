import { useState } from 'react';
import type { Staff } from '../../types';
import '../common/ModalForm.css';

interface EditStaffFormProps {
  staff: Staff;
  onSuccess: (staff: Staff) => void;
  onCancel: () => void;
}

const EditStaffForm = ({ staff, onSuccess, onCancel }: EditStaffFormProps) => {
  const [formData, setFormData] = useState({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    phone: staff.phone,
    role: staff.role,
    joinDate: staff.joinDate,
    status: staff.status
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      ...staff,
      ...formData
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Chỉnh sửa thông tin nhân viên</h2>
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
              required
            >
              <option value="admin">Quản trị viên</option>
              <option value="librarian">Thủ thư</option>
              <option value="assistant">Trợ lý</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              required
            >
              <option value="active">Đang làm việc</option>
              <option value="inactive">Đã nghỉ việc</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="submit-button">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffForm;
