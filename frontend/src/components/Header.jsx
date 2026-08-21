import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <header className="relative z-20">
      {/* SVG Filter für Liquid Glass Effekt */}
      <svg aria-hidden="true" className="absolute inset-0 h-0 w-0">
        <filter
          colorInterpolationFilters="sRGB"
          id="liquid-glass-filter-header"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            baseFrequency="0.05 0.05"
            numOctaves="1"
            result="turbulence"
            seed="2"
            type="fractalNoise"
          />
          <feGaussianBlur
            in="turbulence"
            result="blurredNoise"
            stdDeviation="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            result="displaced"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
          />
          <feGaussianBlur in="displaced" result="finalBlur" stdDeviation="4" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </svg>

      {/* Semi-transparenter Container über Video */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/5 dark:bg-black/20 backdrop-blur-md border-b border-[#636367]/10"
        style={{
          backdropFilter: "url(#liquid-glass-filter-header)",
        }}
      >
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#8A9A76] to-[#636367] bg-clip-text text-transparent"
            >
              EvenTime
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#DDC49A]/30 text-[#636367]"
                    : "text-[#636367] hover:bg-[#DDC49A]/20 hover:text-[#8A9A76]"
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
                      ? "bg-[#8A9A76]/20 text-[#636367]"
                      : "text-[#636367] hover:bg-[#8A9A76]/10 hover:text-[#8A9A76]"
                  }`
                }
              >
                Create Event
              </NavLink>
            )}

            {/* Auth Controls */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-[#636367]">
                    Hi, {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#636367] hover:bg-[#8A9A76]/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#636367] hover:bg-[#DDC49A]/20 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8A9A76] text-white hover:bg-[#8A9A76]/90 transition-colors shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#636367] hover:bg-[#DDC49A]/20 focus:outline-none"
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#636367]/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-base font-medium text-[#636367] hover:bg-[#DDC49A]/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {isAuthenticated && (
                <Link
                  to="/events/create"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-[#636367] hover:bg-[#8A9A76]/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Event
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-[#636367] hover:bg-[#DDC49A]/20"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-[#636367] hover:bg-[#DDC49A]/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-[#636367] hover:bg-[#8A9A76]/10"
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
