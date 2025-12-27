import { useEffect, useState } from "react";

export default function EditMovieModal({ open, movie, onClose, onSubmit }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (movie) {
      setForm({
        maPhim: movie.maPhim,
        tenPhim: movie.tenPhim || "",
        trailer: movie.trailer || "",
        moTa: movie.moTa || "",
        ngayKhoiChieu: movie.ngayKhoiChieu?.slice(0, 10) || "",
        danhGia: movie.danhGia ?? 0,
        hot: movie.hot ?? false,
        dangChieu: movie.dangChieu ?? false,
        sapChieu: movie.sapChieu ?? false,
        hinhAnh: null,
      });
    }
  }, [movie]);

  if (!open || !form) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in form) {
      let value = form[key];

      if (value === null || value === undefined || value === "") continue;

      if (key === "maPhim") {
        formData.append(key, value);
        continue;
      }

      // file ảnh
      if (key === "hinhAnh") {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        }
        continue;
      }

      // ngày khởi chiếu
      if (key === "ngayKhoiChieu") {
        const [y, m, d] = value.split("-");
        formData.append(key, `${d}/${m}/${y}`);
        continue;
      }

      // boolean, number, string
      formData.append(key, value);
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[420px] shadow-2xl"
      >
        <h2 className="font-semibold mb-5 text-xl text-gray-800">
          Chỉnh sửa phim
        </h2>

        <input
          name="tenPhim"
          value={form.tenPhim}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="moTa"
          value={form.moTa}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="ngayKhoiChieu"
          value={form.ngayKhoiChieu}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          name="hinhAnh"
          onChange={handleChange}
          className="mb-4 text-sm"
        />

        <div className="flex gap-4 mb-5 text-sm text-gray-700">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="hot"
              checked={form.hot}
              onChange={handleChange}
            />
            Hot
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="dangChieu"
              checked={form.dangChieu}
              onChange={handleChange}
            />
            Đang chiếu
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="sapChieu"
              checked={form.sapChieu}
              onChange={handleChange}
            />
            Sắp chiếu
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>

          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
