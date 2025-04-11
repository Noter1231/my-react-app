import { useState, useEffect } from 'react';
import { staffService as apiService } from '../services/staffService';
import StaffTable from '../components/staff/StaffTable';
import StaffForm from '../components/staff/StaffForm';
import EditStaffForm from '../components/staff/EditStaffForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Staff } from '../types';
import './Staff.css';

const Staff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getStaff();
      if (response.success && response.data) {
        setStaff(response.data);
      } else {
        setError(response.error || 'Không thể tải danh sách nhân viên');
      }
    } catch (err) {
      console.error('Staff page error:', err);
      setError('Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchStaff();
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
  };

  const handleEditSubmit = async (staffMember: Staff) => {
    try {
      const response = await apiService.updateStaff(staffMember.id, staffMember);
      if (response.success) {
        await fetchStaff();
        setEditingStaff(null);
      } else {
        setError(response.error || 'Không thể cập nhật nhân viên');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật nhân viên');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        const response = await apiService.deleteStaff(id);
        if (response.success) {
          await fetchStaff();
        } else {
          setError(response.error || 'Không thể xóa nhân viên');
        }
      } catch (err) {
        console.error('Delete error:', err);
        setError('Đã xảy ra lỗi khi xóa nhân viên');
      }
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>Quản lý nhân viên</h1>
        <button 
          className="add-button"
          onClick={() => setIsFormOpen(true)}
        >
          + Thêm nhân viên
        </button>
      </div>

      {isFormOpen && (
        <StaffForm
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {editingStaff && (
        <EditStaffForm
          staff={editingStaff}
          onSuccess={(updatedStaff) => {
            handleEditSubmit(updatedStaff);
            setEditingStaff(null);
          }}
          onCancel={() => setEditingStaff(null)}
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

      <StaffTable
        staff={filteredStaff}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Staff;



