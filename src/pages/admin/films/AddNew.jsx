// import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewFilmService } from "@store/admin/addNewFilm/addMovieApi.js";

export default function AddNewFilm() {
  const dispatch = useDispatch();
  const newFilmState = useSelector((state) => state.addMovie);
  const { loading, data, error } = newFilmState;

  const [newFilm, setNewFilm] = useState({
    tenPhim: "",
    trailer: "",
    hinhAnh: null, // KHỞI TẠO NULL CHO FILE
    moTa: "",
    ngayKhoiChieu: "",
    danhGia: 0, // KHỞI TẠO SỐ CHO ĐÁNH GIÁ
    hot: false, // KHỞI TẠO BOOLEAN
    dangChieu: false,
    sapChieu: false,
    maNhom: "GP01", // Trường cố định
  });

  const handleOnChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    let newValue;

    if (type === "file") {
      newValue = files[0];
    } else if (type === "checkbox") {
    } else if (name === "danhGia") {
      newValue = Number(value);
    } else {
      newValue = value;
    }

    setNewFilm((prevFilm) => ({
      ...prevFilm,
      [name]: newValue,
    }));
  };

  const handleAddNewFlim = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in newFilm) {
      let value = newFilm[key];

      if (value === null || value === undefined || value === "") {
        continue;
      }

      if (key === "hinhAnh") {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        }
        continue;
      }

      if (key === "ngayKhoiChieu" && typeof value === "string") {
        const parts = value.split("-");

        if (parts.length === 3) {
          const year = parts[0];
          const month = parts[1];
          const day = parts[2];

          value = `${day}/${month}/${year}`;
        } else {
          continue;
        }
      }

      formData.append(key, value);
    }

    dispatch(addNewFilmService(formData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200 mt-10"
      onSubmit={handleAddNewFlim}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Thêm Phim Mới
      </h2>

      {/* 1. Tên phim */}
      <div className="mb-4">
        <label
          htmlFor="tenPhim"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên phim:
        </label>
        <input
          onChange={handleOnChange}
          value={newFilm.tenPhim}
          type="text"
          id="tenPhim"
          name="tenPhim"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nhập tên phim"
        />
      </div>

      {/* 2. Trailer */}
      <div className="mb-4">
        <label
          htmlFor="trailer"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Trailer:
        </label>
        <input
          onChange={handleOnChange}
          value={newFilm.trailer}
          type="url"
          id="trailer"
          name="trailer"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="URL trailer (ví dụ: YouTube embed link)"
        />
      </div>

      {/* 3. Mô tả */}
      <div className="mb-4">
        <label
          htmlFor="moTa"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả:
        </label>
        <textarea
          onChange={handleOnChange}
          value={newFilm.moTa}
          id="moTa"
          name="moTa"
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Giám Mục Bóng Tối (Woo Do Hwan)"
        />
      </div>

      {/* 4. Ngày khởi chiếu */}
      <div className="mb-4">
        <label
          htmlFor="ngayKhoiChieu"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ngày khởi chiếu:
        </label>
        <input
          onChange={handleOnChange}
          value={newFilm.ngayKhoiChieu}
          type="date"
          id="ngayKhoiChieu"
          name="ngayKhoiChieu"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* 5. Checkboxes */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center">
          <input
            onChange={handleOnChange}
            checked={newFilm.dangChieu}
            id="dangChieu"
            name="dangChieu"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="dangChieu"
            className="ml-2 block text-sm text-gray-900"
          >
            Đang chiếu
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={handleOnChange}
            checked={newFilm.sapChieu}
            id="sapChieu"
            name="sapChieu"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="sapChieu"
            className="ml-2 block text-sm text-gray-900"
          >
            Sắp chiếu
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={handleOnChange}
            checked={newFilm.hot}
            id="hot"
            name="hot"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="hot" className="ml-2 block text-sm text-gray-900">
            Hot
          </label>
        </div>
      </div>

      {/* 6. Số sao */}
      <div className="mb-4">
        <label
          htmlFor="danhGia"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Số sao:
        </label>
        <input
          onChange={handleOnChange}
          value={newFilm.danhGia}
          type="number"
          id="danhGia"
          name="danhGia"
          min={0}
          max={10}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Điểm từ 0 đến 10"
        />
      </div>

      {/* 7. Hình ảnh (File) */}
      <div className="mb-6">
        <label
          htmlFor="hinhAnh"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hình ảnh:
        </label>
        <div className="mt-1 flex items-center space-x-3">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996h-.001zm-3.5 1.503a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
          </span>
          <input
            onChange={handleOnChange}
            type="file"
            id="hinhAnh"
            name="hinhAnh"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </div>

      {/* Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Thêm Phim
        </button>
      </div>

      {error && (
        <p className="mt-3 text-red-500 text-sm text-center">
          Lỗi:{" "}
          {error.content || error.message || "Đã xảy ra lỗi không xác định."}
        </p>
      )}
    </form>
  );
}
