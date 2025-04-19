import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // ✅ use context method

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/login/" : "/signup/";

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to authenticate");
        return;
      }

      login(data.access, email); // ✅ use context to update global state

      router.push("/");
    } catch (err) {
      console.error("Login network error:", err);
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
          {isLogin ? "Login" : "Signup"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-gray-300 underline"
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </button>
      </form>
    </div>
  );
}
