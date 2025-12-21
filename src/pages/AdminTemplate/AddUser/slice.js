import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/servies";
// import reducer from "../Manager/slice";
const initialState = {
  loading: false,
  error: null,
  data: null,
};
export const addUSerService = createAsyncThunk(
  "addUSer/addUserServices",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", user);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addUSerSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUSerService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUSerService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addUSerService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default addUSerSlice.reducer;
