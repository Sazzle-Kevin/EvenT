import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/api";

export default function SignUp() {
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
      await signUp({ email, password });

      navigate("/signin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        placeholder="E-Mail"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>

      {error && <p>{error}</p>}
    </form>
  );
}
