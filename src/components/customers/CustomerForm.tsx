import { useState } from 'react';
import { apiService } from '../../services/api';
import { Customer } from '../../types';
import '../common/ModalForm.css';

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CustomerForm = ({ onSuccess, onCancel }: CustomerFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'regular',
    membershipDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.createCustomer(formData);
      if (response.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Không thể thêm độc giả:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thêm độc giả mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
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
            <label htmlFor="address">Địa chỉ</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="membershipType">Loại thẻ thành viên</label>
            <select
              id="membershipType"
              value={formData.membershipType}
              onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
              required
            >
              <option value="regular">Thường</option>
              <option value="vip">VIP</option>
              <option value="student">Sinh viên</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="membershipDate">Ngày đăng ký</label>
            <input
              id="membershipDate"
              type="date"
              value={formData.membershipDate}
              onChange={(e) => setFormData({...formData, membershipDate: e.target.value})}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Đang thêm...' : 'Thêm độc giả'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;


