import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListMovieAdmin,
  deleteFilmService,
  updateFilmService,
} from "./movieManageApi.js";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const movieManageSlice = createSlice({
  name: "movieManageSlice",
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

export default movieManageSlice.reducer;
