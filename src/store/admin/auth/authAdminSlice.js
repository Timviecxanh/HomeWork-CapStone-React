import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "@store/admin/auth/authAdminApi.js";

const adminSlice = createSlice({
  name: "adminAuth",
  initialState: {
    userAdmin: JSON.parse(localStorage.getItem("userAdmin")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.userAdmin = null;
      localStorage.removeItem("userAdmin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userAdmin = action.payload;
        console.log(action.payload);
        localStorage.setItem("userAdmin", JSON.stringify(action.payload));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminLogin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      });
  },
});
export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
