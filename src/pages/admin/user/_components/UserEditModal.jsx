import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserService } from "@store/admin/user/userManageApi.js";

export default function UserEditModal({ user, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
  });

  // Đổ user vào form khi mở modal
  useEffect(() => {
    if (user) {
      setForm({
        taiKhoan: user.taiKhoan || "",
        hoTen: user.hoTen || "",
        email: user.email || "",
        soDT: user.soDT || "",
        matKhau: user.matKhau || "",
        maNhom: "GP01", // CỰC KỲ QUAN TRỌNG: Phải có mã nhóm
        maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserService(form)).then(() => onClose());
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[420px] shadow-2xl"
      >
        <h2 className="font-semibold mb-5 text-xl text-gray-800">
          Chỉnh sửa người dùng
        </h2>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Tài khoản
        </label>
        <input
          name="taiKhoan"
          value={form.taiKhoan}
          disabled
          className="border border-gray-300 rounded-md p-2 w-full mb-3 bg-gray-100 cursor-not-allowed"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Mật Khẩu
        </label>
        <input
          name="matKhau"
          value={form.matKhau}
          onChange={handleChange}
          placeholder="Mat Khau"
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Họ Tên
        </label>
        <input
          name="hoTen"
          value={form.hoTen}
          onChange={handleChange}
          placeholder="Họ tên"
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Số Điện Thoại
        </label>
        <input
          name="soDT"
          value={form.soDT}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border border-gray-300 rounded-md p-2 w-full mb-5 focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
