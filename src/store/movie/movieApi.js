import api from "@services/api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getMovies = createAsyncThunk(
  "QuanLyPhim/LayDanhSachPhim",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const getMovieDetail = createAsyncThunk(
  "QuanLyPhim/LayThongTinPhim",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { getMovies, getMovieDetail };
