import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Weiße Schrift für Header — kontrastreich über dynamischem Video
const SILVER = {
  text: "text-white",
  textHover: "",
  hoverBg: "hover:bg-white/10",
  active: "text-white",
  activeBg: "bg-white/15",
  border: "border-gray-500/30",
  primaryBtn: "bg-[#8A9A76] hover:bg-[#636367]",
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
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-b border-white/20 liquid-glass">
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
                    ? "text-white bg-white/15"
                    : "text-white hover:bg-white/10"
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
                      ? "text-white bg-white/15"
                      : "text-white hover:bg-white/10"
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
                  <span className="text-sm text-white">
                    Hi, {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary px-4 py-2 text-sm"
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
                className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {isAuthenticated && (
                <Link
                  to="/events/create"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Event
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="btn-primary w-full text-left px-3 py-2 text-base"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="btn-primary w-full text-left px-3 py-2 text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary w-full text-left px-3 py-2 text-base"
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
