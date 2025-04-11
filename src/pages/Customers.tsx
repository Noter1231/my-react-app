import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerForm from '../components/customers/CustomerForm';
import EditCustomerForm from '../components/customers/EditCustomerForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Customer } from '../types';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCustomers();
      if (response.success && response.data) {
        setCustomers(response.data);
      } else {
        setError(response.error || 'Không thể tải danh sách độc giả');
      }
    } catch (err) {
      console.error('Customers page error:', err);
      setError('Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchCustomers();
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleEditSubmit = async (customer: Customer) => {
    try {
      const response = await apiService.updateCustomer(customer.id, customer);
      if (response.success) {
        await fetchCustomers();
        setEditingCustomer(null);
      } else {
        setError(response.error || 'Không thể cập nhật độc giả');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật độc giả');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa độc giả này?')) {
      try {
        const response = await apiService.deleteCustomer(id);
        if (response.success) {
          await fetchCustomers();
        } else {
          setError(response.error || 'Không thể xóa độc giả');
        }
      } catch (err) {
        console.error('Delete error:', err);
        setError('Đã xảy ra lỗi khi xóa độc giả');
      }
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>Quản lý độc giả</h1>
        <button 
          className="add-button"
          onClick={() => setIsFormOpen(true)}
        >
          + Thêm độc giả
        </button>
      </div>

      {isFormOpen && (
        <CustomerForm
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {editingCustomer && (
        <EditCustomerForm
          customer={editingCustomer}
          onSuccess={(updatedCustomer) => {
            handleEditSubmit(updatedCustomer);
            setEditingCustomer(null);
          }}
          onCancel={() => setEditingCustomer(null)}
        />
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Customers;



