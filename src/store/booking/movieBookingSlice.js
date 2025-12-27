import { createSlice } from "@reduxjs/toolkit";
import {
  getListCinemaTicket,
  checkoutTicket,
} from "@store/booking/movieBookingApi.js";

const movieBookingSlice = createSlice({
  name: "movieBooking",
  initialState: {
    moviesInfor: {},
    listSeats: [],
    selectedSeats: [],
    loading: false,
    error: null,
    checkoutLoading: false,
    checkoutSuccess: false,
    checkoutError: null,
  },

  reducers: {
    // function dispath lấy thông tin danh sách ghế đã chọn
    toggleSeat: (state, action) => {
      const seat = action.payload;
      const isExist = state.selectedSeats.find(
        (item) => item.maGhe === seat.maGhe
      );
      if (isExist) {
        state.selectedSeats = state.selectedSeats.filter(
          (item) => item.maGhe !== seat.maGhe
        );
      } else {
        state.selectedSeats.push(seat);
      }
    },
    // Function clear danh sách ghế da chon
    clearSeat: (state) => {
      state.selectedSeats = [];
    },
    resetCheckoutState: (state) => {
      state.checkoutSuccess = false;
      state.checkoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCinemaTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesInfor = action.payload.content.thongTinPhim;
        state.listSeats = action.payload.content.danhSachGhe;
      })
      .addCase(getListCinemaTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getListCinemaTicket.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutTicket.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutSuccess = false;
      })
      .addCase(checkoutTicket.fulfilled, (state) => {
        state.checkoutLoading = false;
        state.checkoutSuccess = true;
        state.selectedSeats = [];
      })
      .addCase(checkoutTicket.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload.message;
      });
  },
});
export const { setMovieDetail, toggleSeat, clearSeat, resetCheckoutState } =
  movieBookingSlice.actions;
export default movieBookingSlice.reducer;
