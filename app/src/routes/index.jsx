import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/profil" replace /> },
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/profil", element: <Profile /> },
          { path: "/dashboard", element: <Dashboard /> }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
]);