import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profil",
        element: <Profile />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);