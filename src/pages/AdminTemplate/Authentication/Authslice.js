import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/servies";
// import { data } from "react-router-dom";
const userInfoString = localStorage.getItem("USER_ADMIN");
const data = userInfoString ? JSON.parse(userInfoString) : null;
const initialState = {
  loading: false,
  data,
  error: null,
};

export const authServices = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("/QuanLyNguoiDung/DangNhap", user);
      // console.log(response);
      const role = response.data.content.maLoaiNguoiDung;
      if (role === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "** Ban Khong Duoc Quyenh Truy Cap Vao ** ",
            },
          },
        });
      }
      const userInfoString = JSON.stringify(response.data.content);
      localStorage.setItem("USER_ADMIN", userInfoString);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.data = null), (state.error = null), (state.loading = false);
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(authServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
