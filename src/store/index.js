import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";
import adminSlice from "./admin/auth/authAdminSlice.js";
import movieSlice from "./movie/movieSlice.js";
import cinemaSlice from "./cinema/cinemaSlice.js";
import movieBookingSlice from "./booking/movieBookingSlice.js";
import movieManageSlice from "./admin/films/movieManageSlice.js";
import addMovieSlice from "./admin/addNewFilm/addMovieSlice.js";
import manageSliceUser from "./admin/user/userManageSlice.js";

const store = configureStore({
  reducer: {
    auth: userSlice,
    movie: movieSlice,
    cinema: cinemaSlice,
    booking: movieBookingSlice,
    // admin: adminSlice
    authAdmin: adminSlice,
    userManage: manageSliceUser,
    movieManage: movieManageSlice,
    addMovie: addMovieSlice,
  },
});
export default store;
