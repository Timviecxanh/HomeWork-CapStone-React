import { configureStore } from "@reduxjs/toolkit";
import ManagerSlice from "./../pages/AdminTemplate/Manager/slice";
import AuthSlice from "../pages/AdminTemplate/Authentication/Authslice";
import AddNewFilmSlice from "../pages/AdminTemplate/AddNewFlim/slice";
import ManagerUSerSlice from "../pages/AdminTemplate/ManagerUser/slice";
const store = configureStore({
  reducer: {
    ManagerSlice,
    AuthSlice,
    AddNewFilmSlice,
    ManagerUSerSlice,
  },
});
export default store;
