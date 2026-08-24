import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#8A9A76] border-t-transparent"></div>
    </div>
  );
}

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingFallback />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}

// Public route - redirects authenticated users away from auth pages
export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingFallback />;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
