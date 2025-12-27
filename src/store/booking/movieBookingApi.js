import api from "@services/api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListCinemaTicket = createAsyncThunk(
  "QuanLyDatVe/LayDanhSachPhongVe",
  async ({ maLichChieu }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=" + maLichChieu
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkoutTicket = createAsyncThunk(
  "QuanLyDatVe/DatVe",
  async ({ bookingData }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      if (!user)
        return rejectWithValue({
          message: "Please login to perform this action!",
          statusCode: 401,
        });
      const response = await api.post("QuanLyDatVe/DatVe", bookingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export default { getListCinemaTicket, checkoutTicket };
