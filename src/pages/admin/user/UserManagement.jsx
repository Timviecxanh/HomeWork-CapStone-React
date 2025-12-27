import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListUser,
  deleteUserService,
} from "@store/admin/user/userManageApi.js";
import ListUserTable from "./_components/ListUserTable";
import UserEditModal from "./_components/UserEditModal";
export default function UserManagement() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, loading, error } = useSelector((state) => state.userManage);
  console.log("state", data);

  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);

  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Xóa Tài Khoản "${taiKhoan}"`)) {
      dispatch(deleteUserService(taiKhoan));
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
  };
  if (loading) {
    return <p className="p-6">Đang tải...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="p-6 text-gray-500">Không có người dùng</p>;
  }
  const customers = data.filter((user) => user.maLoaiNguoiDung === "KhachHang");

  return (
    <div className="p-6">
      <ListUserTable
        users={customers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
