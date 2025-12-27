import { createSlice } from "@reduxjs/toolkit";
import { getMovies, getMovieDetail } from "@store/movie/movieApi.js";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieData: [], //Danh sách phim
    movieInfo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload.content;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieInfo = action.payload.content;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMovieDetail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default movieSlice.reducer;
