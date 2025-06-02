import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha"; // ✅

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const recaptchaRef = useRef(null); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let recaptchaToken = null;
    if (isLogin && recaptchaRef.current) {
      recaptchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
    }

    const endpoint = isLogin
      ? "/dj-rest-auth/login/"
      : "/dj-rest-auth/registration/";

    const payload = isLogin
      ? { email, password, recaptcha_token: recaptchaToken } // ✅ include token
      : {
          email,
          username,
          password1: password,
          password2: password,
          first_name: firstName,
          last_name: lastName,
        };

    try {
      const res = await fetch(`http://127.0.0.1:8001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Auth response:", data);

      if (!res.ok) {
        if (data.detail) {
          setError(data.detail);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors.join(" "));
        } else if (data.recaptcha) {
          setError(`reCAPTCHA: ${data.recaptcha}`);
        } else {
          setError("Login failed. Please check your credentials.");
        }
        return;
      }

      if (isLogin) {
        const token = data.key || data.access || data.access_token;
        if (!token) {
          setError("Unexpected login response. No access token.");
          return;
        }
        login(token, email);
        router.push("/");
      } else {
        setError("Signup successful. Please verify your email before logging in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Network error. Please try again.");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://127.0.0.1:8000/accounts/${provider}/login/`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full mb-3 p-2 rounded text-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full mb-3 p-2 rounded text-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 rounded text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}
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
          className="w-full mb-2 p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isLogin && (
          <div className="text-right mb-4">
            <Link href="/forgot-password" className="text-blue-400 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>
        )}

        {isLogin && (
          <ReCAPTCHA
            sitekey="6LeRoj8rAAAAAKZbaAptJFmAxzlk5PXsyVboNj6D" // 🔁 Replace with your real site key
            size="invisible"
            ref={recaptchaRef}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="mt-4 text-sm text-gray-300 underline"
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </button>

        <hr className="my-6 border-gray-600" />

        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 mb-3"
        >
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("github")}
          className="w-full bg-gray-700 py-2 rounded hover:bg-gray-800"
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  );
}
