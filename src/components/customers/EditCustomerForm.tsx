import { useState } from 'react';
import type { Customer } from '../../types';
import './EditCustomerForm.css';

interface EditCustomerFormProps {
  customer: Customer;
  onSuccess: (customer: Customer) => void;
  onCancel: () => void;
}

const EditCustomerForm = ({ customer, onSuccess, onCancel }: EditCustomerFormProps) => {
  const [formData, setFormData] = useState({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    membershipDate: customer.membershipDate,
    status: customer.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData as Customer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="edit-customer-overlay">
      <div className="edit-customer-modal">
        <button className="close-btn" onClick={onCancel}>&times;</button>
        
        <h2>Chỉnh sửa thông tin độc giả</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ngày đăng ký</label>
            <input
              type="date"
              name="membershipDate"
              value={formData.membershipDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button type="submit" className="save-btn">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerForm;
