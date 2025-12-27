import adminApi from "@services/adminApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListUser = createAsyncThunk(
  "managerUser/fetchListUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP01"
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteUserService = createAsyncThunk(
  "managerUser/deleteUser", // Đổi tên từ deleteFilm thành deleteUser cho đúng ngữ cảnh
  async (taiKhoan, { rejectWithValue }) => {
    try {
      // Xóa dấu ; thừa và đóng ngoặc đúng chỗ
      await adminApi.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      );
      return taiKhoan; // Trả về tài khoản đã xóa để filter dưới store
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateUserService = createAsyncThunk(
  "managerUser/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await adminApi.post(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
