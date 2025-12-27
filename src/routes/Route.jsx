import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
const Auth = lazy(() => import("../layout/AuthLayout.jsx"));
const UserLayout = lazy(() => import("../layout/UserLayout.jsx"));
const AdminLayout = lazy(() => import("../layout/AdminLayout.jsx"));

const AdminLogin = lazy(() => import("../pages/admin/auth/LoginAdmin.jsx"));
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard.jsx"));
const FilmManage = lazy(() => import("../pages/admin/films/FilmManage.jsx"));
const AddNew = lazy(() => import("../pages/admin/films/AddNew.jsx"));
const UserManage = lazy(() => import("../pages/admin/user/UserManagement.jsx"));

const Home = lazy(() => import("../pages/user/Home/Home"));
const About = lazy(() => import("../pages/user/About/About"));
const Contact = lazy(() => import("../pages/user/Contact/Contact"));
const Profile = lazy(() => import("../pages/user/Profile/Profile"));
const Movie = lazy(() => import("../pages/user/Movie/Movie"));
const MovieDetails = lazy(() => import("../pages/user/Movie/MovieDetails"));
const SeatsPage = lazy(() => import("../pages/user/Movie/SeatsPage"));
const Login = lazy(() => import("../pages/user/Auth/Login"));
const Register = lazy(() => import("../pages/user/Auth/Register"));
const ForgotPassword = lazy(() => import("../pages/user/Auth/ForgotPassword"));

const routes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "movie", element: <Movie /> },
      { path: "contact", element: <Contact /> },
      { path: "account/profile", element: <Profile /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "movie/booking-details/:id", element: <SeatsPage /> },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "password/reset", element: <ForgotPassword /> },
    ],
  },

  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard />, index: true },
      { path: "films", element: <FilmManage /> },
      { path: "films/add-new", element: <AddNew /> },
      { path: "users", element: <UserManage /> },
    ],
  },
  {
    path: "auth/admin",
    element: <AdminLogin />,
    children: [{ path: "login", element: <AdminLogin /> }],
  },

  { path: "*", element: <h1>404</h1> },
];

const renderRoutes = () => {
  return routes.map((route, i) => {
    const { path, index, element, children } = route;

    // Route cấp 1
    return (
      <Route key={i} path={path} index={index} element={element}>
        {/* Route con cấp 2 */}
        {children &&
          children.map((child, j) => {
            const { path, index, element } = child;
            return (
              <Route key={j} path={path} index={index} element={element} />
            );
          })}
      </Route>
    );
  });
};
export default renderRoutes;
