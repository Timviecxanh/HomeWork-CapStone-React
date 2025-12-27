import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "@store/admin/auth/authAdminApi.js";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAdmin, loading, error } = useSelector((state) => state.authAdmin);

  console.log(" error UI", error);
  useEffect(() => {
    if (userAdmin) {
      navigate("/admin/dashboard");
    }
  }, [userAdmin]);
  const loginForm = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Account is required"),
      matKhau: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch(adminLogin(values)).unwrap();
      // console.log("result", result);
      // if (result) {
      //   navigate("/admin/dashboard"); // Chuyển tới profile ở đây
      // }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className=" bg-white p-10 w-[500px]  rounded-xl">
        <form
          onSubmit={loginForm.handleSubmit}
          className="flex flex-col gap-5 items-center justify-center"
        >
          <h1 className="font-bold text-2xl">LOGIN</h1>
          <TextField
            className="w-full"
            id="taiKhoan"
            label="Account"
            variant="standard"
            value={loginForm.values.taiKhoan}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.touched.taiKhoan && loginForm.errors.taiKhoan}
            helperText={loginForm.touched.taiKhoan && loginForm.errors.taiKhoan}
          />
          <TextField
            className="w-full"
            id="matKhau"
            label="Password"
            variant="standard"
            type="password"
            value={loginForm.values.matKhau}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.touched.matKhau && loginForm.errors.matKhau}
            helperText={loginForm.touched.matKhau && loginForm.errors.matKhau}
          />
          {error && (
            <div
              className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft text-red-600"
              role="alert"
            >
              {error.content}
            </div>
          )}
          <Button type="submit" variant="contained" color="success">
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
