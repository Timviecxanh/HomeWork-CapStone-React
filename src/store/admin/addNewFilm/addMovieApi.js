import adminApi from "@services/adminApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewFilmService = createAsyncThunk(
  "addnewfilm/addNewFilmService",
  async (data, { rejectWithValue }) => {
    try {
      const result = await adminApi.post("QuanLyPhim/ThemPhimUploadHinh", data);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
