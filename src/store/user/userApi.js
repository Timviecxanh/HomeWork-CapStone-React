import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api.js";

const login = createAsyncThunk(
  "fetchLoginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangNhap", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const register = createAsyncThunk(
  "QuanLyNguoiDung/DangKy",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangKy", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getUserDetails = createAsyncThunk(
  "QuanLyNguoiDung/ThongTinTaiKhoan",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { login, register, getUserDetails };
