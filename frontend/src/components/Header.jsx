import { Link } from "react-router";

export default function Header() {
  return (
    <header className="w-full bg-surface px-6 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="text-4xl font-bold text-blue-700 curser-pointer"
        >
          EvenT
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-300 curser-pointer">
            Home
          </Link>

          <Link
            to="/create-event"
            className="hover:text-gray-300 curser-pointer"
          >
            Create Event
          </Link>

          <Link to="/signin" className="hover:text-gray-300 curser-pointer">
            Sign In
          </Link>

          <Link to="/signup" className="hover:text-gray-300 curser-pointer">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
