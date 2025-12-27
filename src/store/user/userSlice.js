import { createSlice } from "@reduxjs/toolkit";
import { login, register, getUserDetails } from "@store/user/userApi.js";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null || JSON.parse(localStorage.getItem("user")),
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        console.log("register.fulfilled: ", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.content;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
      })
      .addCase(getUserDetails.pending, (state, action) => {
        state.loading = true;
        state.userInfo = null;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
