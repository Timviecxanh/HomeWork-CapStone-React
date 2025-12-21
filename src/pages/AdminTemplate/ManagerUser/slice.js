import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/servies";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export const fetchListUser = createAsyncThunk(
  "managerUser/fetchListUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
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
      await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
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
      const result = await api.post(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const ManagerSliceUSer = createSlice({
  name: "ManagerSliceUSer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchListUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi khi tải danh sách người dùng";
      })

      .addCase(updateUserService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (u) => u.taiKhoan === action.payload.taiKhoan
        );
        if (index != -1) state.data[index] = action.payload;
      })

      //Delete
      .addCase(deleteUserService.fulfilled, (state, action) => {
        // Phải là state.data.filter (vì state là object chứa data)
        state.data = state.data.filter(
          (user) => user.taiKhoan !== action.payload
        );
      });
  },
});

export default ManagerSliceUSer.reducer;
