import React, { useState } from "react";
import { authServices } from "./../Authentication/Authslice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Auth() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.AuthSlice);
  const { loading, error, data } = authState;
  const [user, setUser] = useState({
    taikhoan: "",
    matkhau: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authServices(user));
    console.log(user);
  };
  if (loading) return <div>Loading...</div>;
  if (data) {
    return <Navigate to="/admin"></Navigate>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {error && (
        <div className="rounded-md bg-yellow-50 p-4 shadow-md transition duration-300 ease-in-out">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.427 2.684-1.427 3.449 0l5.59 10.432c.765 1.427-.235 3.099-1.856 3.099H4.523c-1.621 0-2.621-1.672-1.856-3.099l5.59-10.432zM10 12a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="mt-2 text-sm text-yellow-700">
                <p>{error.response?.data?.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Đăng Nhập
        </h2>

        <form
          className="space-y-6 text-left"
          action="#"
          method="POST"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <div className="mt-1">
              <input
                onChange={handleOnChange}
                name="taikhoan"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nhập tên đăng nhập của bạn"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="mt-1">
              <input
                onChange={handleOnChange}
                name="matkhau"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
