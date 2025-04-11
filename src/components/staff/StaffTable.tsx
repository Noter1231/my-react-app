import { Staff } from '../../types';
import { FaPen, FaTrash } from 'react-icons/fa';
import './StaffTable.css';

interface StaffTableProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffTable = ({ staff, onEdit, onDelete }: StaffTableProps) => {
  if (!staff || staff.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có nhân viên nào trong hệ thống</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Chức vụ</th>
            <th>Ngày vào làm</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <span className={`role-badge ${member.role}`}>
                  {member.role === 'admin' ? 'Quản trị viên' : 
                   member.role === 'librarian' ? 'Thủ thư' : 'Trợ lý'}
                </span>
              </td>
              <td>{member.joinDate}</td>
              <td>
                <span className={`status-badge ${member.status}`}>
                  {member.status === 'active' ? 'Đang làm việc' : 'Đã nghỉ việc'}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="action-button edit"
                  onClick={() => onEdit(member)}
                >
                  <FaPen />
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => onDelete(member.id)}
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

export default StaffTable;



