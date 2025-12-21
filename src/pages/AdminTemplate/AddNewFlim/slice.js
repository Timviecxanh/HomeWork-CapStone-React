import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/servies";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const addNewFilmService = createAsyncThunk(
  "addnewfilm/addNewFilmService",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.post("QuanLyPhim/ThemPhimUploadHinh", data);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addNewFlimSlice = createSlice({
  name: "addNewFilmSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewFilmService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewFilmService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addNewFilmService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default addNewFlimSlice.reducer;
