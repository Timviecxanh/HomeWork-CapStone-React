import { createSlice } from "@reduxjs/toolkit";
import { addNewFilmService } from "./addMovieApi.js";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const addMovieSlice = createSlice({
  name: "addNewFilmSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewFilmService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewFilmService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addNewFilmService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default addMovieSlice.reducer;
