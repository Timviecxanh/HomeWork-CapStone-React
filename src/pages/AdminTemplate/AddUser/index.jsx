import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUSerService } from "./slice";

export default function AddUSer() {
  const dispatch = useDispatch();

  // 1. State chứa dữ liệu người dùng
  const [user, setUser] = useState({
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    MaLoaiNguoiDung: "KhachHang",
  });

  // 2. State chứa thông báo lỗi
  const [errors, setErrors] = useState({});

  // 3. Hàm Validation
  // Hàm này kiểm tra tất cả các trường và trả về true nếu hợp lệ.
  const validate = () => {
    let tempErrors = {};
    // Regex cho Email cơ bản
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Regex cho SĐT (10 hoặc 11 chữ số)
    const phoneRegex = /^\d{10,11}$/;

    // Kiểm tra trường rỗng
    if (!user.hoTen) tempErrors.hoTen = "Họ Tên không được để trống.";
    if (!user.taiKhoan) tempErrors.taiKhoan = "Tài Khoản không được để trống.";
    if (!user.matKhau) tempErrors.matKhau = "Mật Khẩu không được để trống.";
    if (!user.soDT) tempErrors.soDT = "Số Điện Thoại không được để trống.";
    if (!user.email) tempErrors.email = "Email không được để trống.";

    // Kiểm tra định dạng Email (Chỉ kiểm tra khi trường không rỗng)
    if (user.email && !emailRegex.test(user.email)) {
      tempErrors.email = "Email không đúng định dạng.";
    }
    // Kiểm tra định dạng Số Điện Thoại (Chỉ kiểm tra khi trường không rỗng)
    if (user.soDT && !phoneRegex.test(user.soDT)) {
      tempErrors.soDT = "Số Điện Thoại phải là 10-11 chữ số.";
    }

    // **Tùy chọn:** Thêm kiểm tra độ dài Mật khẩu
    if (user.matKhau && user.matKhau.length < 6) {
      tempErrors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    // Cập nhật state lỗi
    setErrors(tempErrors);

    // Trả về true nếu đối tượng lỗi rỗng (tức là không có lỗi nào)
    return Object.keys(tempErrors).length === 0;
  };

  // 4. Hàm xử lý thay đổi Input
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    // Cập nhật state user
    setUser({
      ...user,
      [name]: value, // Computed Property Names
    });

    // **Xóa lỗi ngay lập tức khi người dùng bắt đầu gõ**
    if (errors[name]) {
      // Tạo bản sao của errors và set lỗi của trường hiện tại về rỗng/null
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Đặt là chuỗi rỗng để không bị lỗi khi render JSX
      }));
    }
  };

  // 5. Hàm xử lý Submit Form
  const handleLogin = (e) => {
    e.preventDefault();

    // Gọi validation
    if (validate()) {
      // Dữ liệu hợp lệ
      dispatch(addUSerService(user));
      alert("Đăng ký thành công! (Dữ liệu gửi lên server)");
      // Tùy chọn: Reset form sau khi submit thành công
      // setUser({ hoTen: "", taiKhoan: "", matKhau: "", email: "", soDT: "", maNhom: "GP01", MaLoaiNguoiDung: "KhachHang" });
    } else {
      // Validation thất bại, thông báo lỗi đã hiển thị
      console.log("Validation thất bại, form chưa được gửi.");
    }
  };

  return (
    <form className="max-w-sm mx-auto mt-20" onSubmit={handleLogin}>
      {/* Tài Khoản */}
      <div className="mb-5">
        <label
          htmlFor="taiKhoan"
          className="block mb-2.5 text-sm font-medium text-heading text-left"
        >
          Tài Khoản
        </label>
        <input
          onChange={handleOnchange}
          name="taiKhoan"
          id="taiKhoan"
          value={user.taiKhoan}
          className={`bg-neutral-secondary-medium border ${
            errors.taiKhoan ? "border-red-500" : "border-default-medium"
          } text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body`}
          placeholder="abc"
        />
        {/* Hiển thị lỗi */}
        {errors.taiKhoan && (
          <p className="mt-2 text-sm text-red-600 text-left">
            {errors.taiKhoan}
          </p>
        )}
      </div>

      {/* Mật Khẩu */}
      <div className="mb-5">
        <label
          htmlFor="matKhau"
          className="block mb-2.5 text-sm font-medium text-heading text-left"
        >
          Mật Khẩu
        </label>
        <input
          onChange={handleOnchange}
          // type="password"
          name="matKhau"
          id="matKhau"
          value={user.matKhau}
          className={`bg-neutral-secondary-medium border ${
            errors.matKhau ? "border-red-500" : "border-default-medium"
          } text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body`}
          placeholder="••••••••"
        />
        {errors.matKhau && (
          <p className="mt-2 text-sm text-red-600 text-left">
            {errors.matKhau}
          </p>
        )}
      </div>

      {/* Họ và Tên */}
      <div className="mb-5">
        <label
          htmlFor="hoTen"
          className="block mb-2.5 text-sm font-medium text-heading text-left"
        >
          Họ và Tên
        </label>
        <input
          onChange={handleOnchange}
          name="hoTen"
          id="hoTen"
          value={user.hoTen}
          className={`bg-neutral-secondary-medium border ${
            errors.hoTen ? "border-red-500" : "border-default-medium"
          } text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body`}
          placeholder="Nguyen Van A"
        />
        {errors.hoTen && (
          <p className="mt-2 text-sm text-red-600 text-left">{errors.hoTen}</p>
        )}
      </div>

      {/* Số Điện Thoại */}
      <div className="mb-5">
        <label
          htmlFor="soDT"
          className="block mb-2.5 text-sm font-medium text-heading text-left"
        >
          Số Điện Thoại
        </label>
        <input
          onChange={handleOnchange}
          name="soDT"
          id="soDT"
          // type="tel"
          value={user.soDT}
          className={`bg-neutral-secondary-medium border ${
            errors.soDT ? "border-red-500" : "border-default-medium"
          } text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body`}
          placeholder="1234567890"
        />
        {errors.soDT && (
          <p className="mt-2 text-sm text-red-600 text-left">{errors.soDT}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2.5 text-sm font-medium text-heading text-left"
        >
          Email
        </label>
        <input
          onChange={handleOnchange}
          name="email"
          id="email"
          // type="email"
          value={user.email}
          className={`bg-neutral-secondary-medium border ${
            errors.email ? "border-red-500" : "border-default-medium"
          } text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body`}
          placeholder="nguyenvantao@gmail.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 text-left">{errors.email}</p>
        )}
      </div>

      {/* Nút Submit */}
      <button
        type="submit"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
}
