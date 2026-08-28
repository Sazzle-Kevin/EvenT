import { Link } from "react-router";

export default function Header() {
  // Buchstaben für Schreib-Effekt
  const letters = "EvenT".split("").map((char, i) => (
    <span
      key={i}
      className="inline-block opacity-0"
      style={{
        animation: "typewriter 0.9s ease-in-out forwards",
        animationDelay: `${i * 0.12}s`,
      }}
    >
      {char}
    </span>
  ));

  return (
    <header className="w-full bg-surface px-6 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="hidden sm:block text-4xl font-bold text-blue-700 curser-pointer"
        >
          {letters}
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-purple-200 cursor-pointer">
            Home
          </Link>

          <Link
            to="/create-event"
            className="hover:text-yellow-200 cursor-pointer"
          >
            Create Event
          </Link>

          <Link to="/signin" className="hover:text-teal-200 cursor-pointer">
            Sign In
          </Link>

          <Link to="/signup" className="hover:text-green-200 cursor-pointer">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
