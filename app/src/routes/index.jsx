import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

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
        element: <Profil />
      }
      // {
      //   path: "/dashboard",
      //   element: 
      // }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);