import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/user/userApi.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

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
      console.log(values);
      try {
        const result = await dispatch(login(values)).unwrap();
        console.log("result", result);
        if (result.statusCode === 200) {
          navigate("/"); // Chuyển tới profile ở đây
        } else {
          alert(result.message || "Login failed! Token invalid or user exists");
        }
      } catch (error) {
        console.log(error);
        alert("Login failed!");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen ">
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

          <Button type="submit" variant="contained" color="success">
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p>Don't have an account ?</p>
          <Link className="text-blue-500" to="/auth/register">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
}
