import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/Navbar";
export default function UserLayout() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
