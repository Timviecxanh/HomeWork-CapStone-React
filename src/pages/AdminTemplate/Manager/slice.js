import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/servies";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const fetchListMovieAdmin = createAsyncThunk(
  "admin/fetchListMovie",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("QuanLyPhim/LayDanhSachPhim");
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
      const res = await api.post("QuanLyPhim/CapNhatPhimUpload", formData);
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
      await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return maPhim;
    } catch (err) {
      return rejectWithValue(err.response?.data || err);
    }
  }
);

const adminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchListMovieAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListMovieAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchListMovieAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateFilmService.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.data.findIndex(
          (m) => m.maPhim === action.payload.maPhim
        );
        if (idx !== -1) state.data[idx] = action.payload;
      })

      // delete
      .addCase(deleteFilmService.fulfilled, (state, action) => {
        state.data = state.data.filter((m) => m.maPhim !== action.payload);
      });
  },
});

export default adminSlice.reducer;
