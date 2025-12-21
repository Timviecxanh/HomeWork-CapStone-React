import { Route } from "react-router-dom";

import AdminTemplate from "../pages/AdminTemplate";

import MovieManagement from "../pages/AdminTemplate/Manager";
import AddNewFilm from "../pages/AdminTemplate/AddNewFlim";
import AddUser from "../pages/AdminTemplate/AddUser";
import ManagerUSer from "../pages/AdminTemplate/ManagerUser/index";
import Auth from "../pages/AdminTemplate/Authentication";
import PageNotFound from "../pages/AdminTemplate/PageNotFound";

/* ======================
   ROUTE CONFIG
====================== */
const routes = [
  {
    path: "admin",
    element: <AdminTemplate />,
    children: [
      {
        path: "movie-management",
        element: <MovieManagement />,
      },
      {
        path: "add-movie",
        element: <AddNewFilm />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "manager-user",
        element: <ManagerUSer />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

/* ======================
   RENDER ROUTES
====================== */
const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route
              key={`${route.path}/${child.path}`}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      );
    }

    return <Route key={route.path} path={route.path} element={route.element} />;
  });
};

export default renderRoutes;
