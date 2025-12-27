import React from "react";

export default function ListUserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full divide-y divide-gray-200">
        {/* ===== HEADER ===== */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tài Khoản
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mat Khau
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Họ Tên
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Email
            </th>

            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao Tác
            </th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.taiKhoan} className="hover:bg-gray-50 transition">
              {/* Tài khoản */}
              <td className="px-4 py-3 align-middle text-sm font-medium text-gray-900">
                {user.taiKhoan}
              </td>
              <td className="px-4 py-3 align-middle text-sm font-medium text-gray-900">
                {user.matKhau}
              </td>

              {/* Họ tên */}
              <td className="px-4 py-3 align-middle text-sm font-semibold text-gray-900">
                {user.hoTen}
              </td>

              {/* Email */}
              <td className="px-4 py-3 align-middle text-sm text-gray-500 hidden md:table-cell">
                {user.email}
              </td>

              {/* Thao tác */}
              <td className="px-4 py-3 align-middle text-center text-sm font-medium">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-900 transition p-1 rounded hover:bg-blue-100"
                    title="Chỉnh sửa"
                  >
                    Chỉnh Sửa
                  </button>

                  <button
                    onClick={() => onDelete(user.taiKhoan)}
                    className="text-red-600 hover:text-red-900 transition p-1 rounded hover:bg-red-100"
                    title="Xóa"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
