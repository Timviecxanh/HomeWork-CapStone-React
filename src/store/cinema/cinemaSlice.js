import { createSlice } from "@reduxjs/toolkit";
import {
  getCinemaSystem,
  getShowTimeDetails,
} from "@store/cinema/cinemaApi.js";

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cinemaSystemData: [], //Danh sách hệ thống rạp
    listMovieTheater: [], // Danh sách các cụp rạp theo hệ thống rạp
    listCinema: [], // Danh sách cửa hệ thống rạp / khu vực chiếu
    listShowTime: [], // Danh sách lịch chieu
    loadingCinemaSystem: false,
    loadingShowTime: false,
    errorCinemaSystem: null,
    errorShowTime: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCinemaSystem.fulfilled, (state, action) => {
        state.loadingCinemaSystem = false;
        state.cinemaSystemData = action.payload.content;
      })
      .addCase(getCinemaSystem.rejected, (state, action) => {
        state.loadingCinemaSystem = false;
        state.errorCinemaSystem = action.payload;
      })
      .addCase(getCinemaSystem.pending, (state, action) => {
        state.loadingCinemaSystem = true;
        state.errorCinemaSystem = null;
      })
      .addCase(getShowTimeDetails.fulfilled, (state, action) => {
        state.loadingShowTime = false;
        state.listMovieTheater = action.payload.movieTheater;
        state.listShowTime = action.payload.showTime;
      })
      .addCase(getShowTimeDetails.rejected, (state, action) => {
        state.loadingShowTime = false;
        state.errorShowTime = action.payload;
      })
      .addCase(getShowTimeDetails.pending, (state, action) => {
        state.loadingShowTime = true;
        state.errorShowTime = null;
      });
  },
});
export const { getListCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
