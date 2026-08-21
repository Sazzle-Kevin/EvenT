import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Show nothing while checking auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading-spinner">Loading...</span>
      </div>
    );
  }

  // If not authenticated, redirect to sign-in
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}

// Public route - redirects authenticated users away from auth pages
export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading-spinner">Loading...</span>
      </div>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
