import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/user/userApi.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log("User:   ", user, loading, error);
  const registerForm = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Account is required"),
      matKhau: yup.string().required("Password is required"),
      email: yup.string().required("Email is required"),
      soDt: yup.string().required("Phone number is required"),
      maNhom: yup.string().required("Group is required"),
      hoTen: yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        // dispatch trả về promise, unwrap lấy payload trực tiếp
        const result = await dispatch(register(values)).unwrap();
        console.log("result", result);
        if (result.statusCode === 200) {
          alert("Register success!");
          navigate("/login");
        } else {
          alert(
            result.message || "Register failed! Token invalid or user exists"
          );
        }
      } catch (error) {
        console.log(error);
        alert("Register failed!");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-white p-10 w-[500px]   rounded-xl">
        <form
          onSubmit={registerForm.handleSubmit}
          className="flex flex-col gap-1 items-center justify-center"
        >
          <h1 className="font-bold text-2xl">SIGN UP</h1>
          <TextField
            className="w-full scale-90"
            id="taiKhoan"
            label="Account name"
            variant="standard"
            value={registerForm.values.taiKhoan}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={
              registerForm.touched.taiKhoan && registerForm.errors.taiKhoan
            }
            helperText={
              registerForm.touched.taiKhoan && registerForm.errors.taiKhoan
            }
          />
          <TextField
            className="w-full scale-90"
            id="matKhau"
            label="Password"
            variant="standard"
            value={registerForm.values.matKhau}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={registerForm.touched.matKhau && registerForm.errors.matKhau}
            helperText={
              registerForm.touched.matKhau && registerForm.errors.matKhau
            }
          />
          <TextField
            className="w-full scale-90"
            id="email"
            label="Email"
            variant="standard"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={registerForm.touched.email && registerForm.errors.email}
            helperText={registerForm.touched.email && registerForm.errors.email}
          />
          <TextField
            className="w-full scale-90"
            id="soDt"
            label="Phone number"
            variant="standard"
            value={registerForm.values.soDt}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={registerForm.touched.soDt && registerForm.errors.soDt}
            helperText={registerForm.touched.soDt && registerForm.errors.soDt}
          />
          <TextField
            className="w-full scale-90"
            id="maNhom"
            label="Group"
            variant="standard"
            value={registerForm.values.maNhom}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={registerForm.touched.maNhom && registerForm.errors.maNhom}
            helperText={
              registerForm.touched.maNhom && registerForm.errors.maNhom
            }
          />
          <TextField
            className="w-full scale-90"
            id="hoTen"
            label="Name"
            variant="standard"
            value={registerForm.values.hoTen}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={registerForm.touched.hoTen && registerForm.errors.hoTen}
            helperText={registerForm.touched.hoTen && registerForm.errors.hoTen}
          />

          <Button type="submit" variant="contained" color="success">
            {loading ? "Loading..." : "Sign up"}
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p>Already have an account ?</p>
          <Link className="text-blue-500" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
