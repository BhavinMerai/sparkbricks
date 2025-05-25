import { useState, useRef } from "react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPassword() {
  const router = useRouter();
  const recaptchaRef = useRef(null); // ✅ For reCAPTCHA

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    if (!token) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/dj-rest-auth/password/reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptcha: token }), // ✅ Include CAPTCHA token
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.email?.[0] || "Error sending reset email.");
        return;
      }

      setMessage("Password reset email sent. Redirecting to sign-in...");
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* ✅ Invisible reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LeRoj8rAAAAAKZbaAptJFmAxzlk5PXsyVboNj6D"
          size="invisible"
          ref={recaptchaRef}
        />

        <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
