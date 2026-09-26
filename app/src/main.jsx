// app/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes";
import "./index.css";
import { UserInfoProvider } from "./context/UserInfoContext";
import { UserActivityProvider } from "./context/UserActivityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserInfoProvider>
        <UserActivityProvider>
          <RouterProvider router={router} />
        </UserActivityProvider>
      </UserInfoProvider>
    </AuthProvider>
  </React.StrictMode>
);