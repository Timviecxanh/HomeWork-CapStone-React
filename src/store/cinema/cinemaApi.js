import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api.js";

const getCinemaSystem = createAsyncThunk(
  "QuanLyRap/LayThongTinHeThongRap",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getShowTimeDetails = createAsyncThunk(
  "QuanLyRap/LayThongTinLichChieuHeThongRap",
  async ({ maHeThongRap }, { rejectWithValue }) => {
    try {
      const result = await Promise.all([
        api.get(
          `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        ),
        api.get(
          `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`
        ),
      ]);

      return {
        movieTheater: result[0].data.content,
        showTime: result[1].data.content,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export { getCinemaSystem, getShowTimeDetails };
