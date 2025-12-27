import adminApi from "@services/adminApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListMovieAdmin = createAsyncThunk(
  "admin/fetchListMovie",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("QuanLyPhim/LayDanhSachPhim");
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const updateFilmService = createAsyncThunk(
  "admin/updateFilm",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("QuanLyPhim/CapNhatPhimUpload", formData);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const deleteFilmService = createAsyncThunk(
  "admin/deleteFilm",
  async (maPhim, { rejectWithValue }) => {
    try {
      await adminApi.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return maPhim;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);
