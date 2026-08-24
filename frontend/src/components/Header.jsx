import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Silber-Palette für Header (neutral, über Video sichtbar)
const SILVER = {
  text: "text-gray-200",
  textHover: "hover:text-white",
  hoverBg: "hover:bg-gray-700/20",
  active: "text-gray-100",
  activeBg: "bg-gray-700/30",
  border: "border-gray-500/30",
  primaryBtn: "bg-gray-600 hover:bg-gray-500",
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="absolute top-0 left-0 w-full z-20">
      {/* Liquid-Glass Container: halbtransparent — Video schimmert durch */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-b border-[#636367]/20 liquid-glass">
        <div className="flex justify-between h-16 items-center">
          {/* Logo — Silber */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`${SILVER.text} ${SILVER.textHover} text-2xl font-bold transition-colors`}
            >
              EvenTime
            </Link>
          </div>

          {/* Desktop Navigation — Silber */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${SILVER.active} ${SILVER.activeBg}`
                    : `${SILVER.text} ${SILVER.hoverBg}`
                }`
              }
            >
              Home
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/events/create"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${SILVER.active} ${SILVER.activeBg}`
                      : `${SILVER.text} ${SILVER.hoverBg}`
                  }`
                }
              >
                Create Event
              </NavLink>
            )}

            {/* Auth Controls — Silber */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className={`text-sm ${SILVER.text}`}>
                    Hi, {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${SILVER.text} ${SILVER.hoverBg} transition-colors`}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${SILVER.text} ${SILVER.hoverBg} transition-colors`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${SILVER.primaryBtn} transition-colors shadow-md hover:shadow-lg`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button — Silber */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg ${SILVER.text} ${SILVER.hoverBg} focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu — Silber */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${SILVER.border}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-lg text-base font-medium ${SILVER.text} ${SILVER.hoverBg}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {isAuthenticated && (
                <Link
                  to="/events/create"
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${SILVER.text} ${SILVER.hoverBg}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Event
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${SILVER.text} ${SILVER.hoverBg}`}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${SILVER.text} ${SILVER.hoverBg}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${SILVER.text} ${SILVER.hoverBg}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
