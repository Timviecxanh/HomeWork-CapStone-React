import { Outlet } from "react-router-dom";
import Navbar from "./_components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function AdminTemplate() {
  const authState = useSelector((state) => state.AuthSlice);
  const { data } = authState;

  if (!data) return <Navigate to="/auth"> </Navigate>;
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
