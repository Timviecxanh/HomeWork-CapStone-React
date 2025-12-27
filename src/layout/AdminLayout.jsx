import { Tabs, Tab, Box } from "@mui/material";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../store/admin/auth/authAdminSlice.js";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userAdmin } = useSelector((state) => state.authAdmin);
  if (!userAdmin) {
    return <Navigate to="/auth/admin/login" replace />;
  }

  const tabs = useMemo(() => {
    return [
      { label: "Dashboard", to: "/admin/dashboard" },
      { label: "Users", to: "/admin/users" },
      { label: "Add New", to: "/admin/films/add-new" },
      { label: "Films", to: "/admin/films" },
    ];
  }, []);

  const getCurrentTab = () => {
    const index = tabs.findIndex((tab) => location.pathname.startsWith(tab.to));
    return index;
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/auth/admin/login");
  };

  return (
    <>
      <div className="bg-gray-800 flex justify-between items-center px-8 py-2">
        <div className="flex justify-center items-center gap-1">
          <img className="w-14 h-14" src="/logo-head.png" alt="logo" />
          <p className="font-medium text-2xl text-yellow-200">VIPMovie</p>
        </div>
        <p className="font-medium text-2xl text-yellow-200">Admin</p>
      </div>

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          background: "white",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Tabs
          orientation="vertical"
          value={getCurrentTab()}
          sx={{
            boxShadow: "4px 0 20px rgba(0, 0, 0, 0.25)",
            minWidth: 220,

            "& .MuiTab-root": {
              alignItems: "flex-start",
              justifyContent: "flex-start",
              textAlign: "left",
              px: 2,
              borderRadius: 1,
              transition: "0.2s",
            },
            "& .Mui-selected": {
              backgroundColor: "gray",
              color: "white",
              fontWeight: 600,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} component={Link} to={tab.to} />
          ))}
          <Tab label="Logout" onClick={handleLogout} />
        </Tabs>

        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
