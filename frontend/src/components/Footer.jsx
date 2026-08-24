import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-visible">
      {/* Liquid-Glass Container: halbtransparent */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#636367]/20 liquid-glass">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-[#636367]/70">
            © {currentYear} EvenTime. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              to="/"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
