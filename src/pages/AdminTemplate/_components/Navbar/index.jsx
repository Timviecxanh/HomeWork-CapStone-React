import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../../Authentication/Authslice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();

  const { data: userInfo } = useSelector((state) => state.AuthSlice);

  const handleLogout = () => {
    dispatch(logout());
    return <useNavigate to="/auth"></useNavigate>;
  };

  const username = userInfo?.taiKhoan || "Admin";

  return (
    <header className="bg-white px-9 py-4 border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src="../public/logo.png" alt="" className="h-10 w-auto  " />
          <span className="text-xl font-bold text-gray-800 mr-8px">
            Admin Portal
          </span>
        </div>

        <div className="flex items-center space-x-8 ">
          <nav>
            <ul className="flex space-x-8 text-lg font-medium">
              <li>
                <NavLink
                  to="/admin/movie-management"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all mr-8px"
                      : "text-gray-600 hover:text-blue-600 transition-all mr-8px"
                  }
                >
                  Quản lý Phim
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/add-movie"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all"
                      : "text-gray-600 hover:text-blue-600 transition-all"
                  }
                >
                  Thêm Phim
                </NavLink>
              </li>{" "}
              <li>
                <NavLink
                  to="/admin/add-user"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all"
                      : "text-gray-600 hover:text-blue-600 transition-all"
                  }
                >
                  Thêm Khách Hàng
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/manager-user"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all"
                      : "text-gray-600 hover:text-blue-600 transition-all"
                  }
                >
                  Quản Lí Khách Hàng
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-300">
            <span className="text-sm font-medium text-gray-700">
              Chào,
              <span className="font-semibold text-blue-600">{username}</span>
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors shadow-sm"
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
