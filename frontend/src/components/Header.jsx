import { useState, useRef } from "react";
import { NavLink, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Weiße Schrift für Header — kontrastreich über dynamischem Video
const SILVER = {
  text: "text-white",
  hoverBg: "hover:bg-white/10",
  active: "text-white",
  activeBg: "bg-white/15",
  border: "border-gray-500/30",
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounceRef = useRef(null);
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      if (query.trim().length >= 2) {
        window.dispatchEvent(
          new CustomEvent("search-event", { detail: { query: query.trim() } })
        );
      }
    }, 500);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-20">
      {/* Liquid-Glass Container: halbtransparent — Video schimmert durch */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-b border-white/20 liquid-glass">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`${SILVER.text} text-2xl font-bold transition-colors`}
            >
              EvenTime
            </Link>
          </div>

          {/* Desktop Search: zentriert zwischen Logo und Buttons */}
          <div className="hidden sm:flex flex-1 mx-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Suche Events..."
                className="w-full pl-10 pr-4 py-1.5 text-sm text-white bg-white/5 rounded-full placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#8A9A76] transition-colors"
                aria-label="Suche nach Events"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Desktop Navigation */}
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

            {/* Auth Controls */}
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

          {/* Mobile: Search-Icon + Burger-Menü */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Suche öffnen"
              className={`inline-flex items-center justify-center p-2 rounded-lg ${SILVER.text} ${SILVER.hoverBg} focus:outline-none`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

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

        {/* Mobile menu — slide-down */}
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

        {/* Mobile Search-Overlay: slide-in von oben */}
        {isSearchOpen && (
          <div className="md:hidden absolute top-full left-0 w-full z-30">
            <div className="relative p-4 border-t border-white/20 liquid-glass">
              <div className="relative max-w-md mx-auto">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Suche Events..."
                  className="w-full pl-10 pr-4 py-2 text-sm text-white bg-white/5 rounded-full placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#8A9A76]"
                  aria-label="Suche nach Events"
                  autoFocus
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  aria-label="Suche schließen"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
