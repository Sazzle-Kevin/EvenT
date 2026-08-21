import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {currentYear} EventMatic. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
