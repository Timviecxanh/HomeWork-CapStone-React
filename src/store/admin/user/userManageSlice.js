import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListUser,
  deleteUserService,
  updateUserService,
} from "./userManageApi.js";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const manageSliceUser = createSlice({
  name: "userManageSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchListUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListUser.fulfilled, (state, action) => {
        console.log("User Action", action.payload);
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

export default manageSliceUser.reducer;
