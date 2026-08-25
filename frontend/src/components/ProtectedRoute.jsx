import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("apiToken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
