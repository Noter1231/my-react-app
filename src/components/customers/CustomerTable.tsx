import React from 'react';
import { Customer } from '../../types';
import { FaPen, FaTrash } from 'react-icons/fa';
import './CustomerTable.css';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerTable = ({ customers, onEdit, onDelete }: CustomerTableProps) => {
  if (!customers || customers.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có độc giả nào trong thư viện</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Ngày đăng ký</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.membershipDate}</td>
              <td>
                <span className={`status-badge ${customer.status}`}>
                  {customer.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="action-button edit"
                  onClick={() => onEdit(customer)}
                >
                  <FaPen />
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => onDelete(customer.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;



