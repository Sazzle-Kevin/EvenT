import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/api";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await signIn({
        email,
        password,
      });

      localStorage.setItem("apiToken", data.token);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-12 mb-20 w-fit text-center scale-400 text-background text-[clamp(.5rem,4vw,1rem)] font-['Impact'] [-webkit-text-stroke:.4px_theme(--color-surface)] hover:text-teal-200/90 hover:scale-408 transition-all duration-1000 ease-in-out cursor-default">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-end pb-4 px-4 h-20 max-w-9/10 divide-x border-2">
          <div className="flex flex-col mx-2 w-1/2">
            <label for="email" className="w-fit cursor-pointer">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="E-Mail"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="flex flex-col mx-2 w-1/2">
            <label for="password" className="w-fit cursor-pointer">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="max-w-9/10"
            />
          </div>
        </div>
        <button
          disabled={loading}
          className="mt-8 py-2 px-4 bg-surface w-fit rounded-[100px] hover:bg-teal-500 transition-all duration-600 ease-in-out cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className="mt-6 text-red-300">{error}</p>}
      </form>
    </div>
  );
}
