// pages/reset-password/[uid]/[token].js

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { uid, token } = router.query;
  const recaptchaRef = useRef(null);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const padUid = (rawUid) => {
    if (!rawUid) return "";
    return rawUid.padEnd(rawUid.length + (4 - (rawUid.length % 4)) % 4, "=");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!uid || !token) {
      setError("Invalid reset link. UID or token missing.");
      return;
    }

    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    try {
      const res = await fetch("http://127.0.0.1:8000/dj-rest-auth/password/reset/confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: padUid(uid),
          token,
          new_password1: password1,
          new_password2: password2,
          recaptcha: captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.new_password2) {
          setError(data.new_password2.join(" "));
        } else if (data?.token) {
          setError(data.token.join(" "));
        } else if (data?.uid) {
          setError(data.uid.join(" "));
        } else {
          setError("Password reset failed. Please try again.");
        }
        return;
      }

      setMessage("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (err) {
      console.error("Reset error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 rounded text-black"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 rounded text-black"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <ReCAPTCHA
          sitekey="6LeRoj8rAAAAAKZbaAptJFmAxzlk5PXsyVboNj6D"
          size="invisible"
          ref={recaptchaRef}
        />

        <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
          Reset Password
        </button>
      </form>
    </div>
  );
}
