// pages/password/reset/confirm.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function ResetConfirm() {
  const router = useRouter();
  const { uid, token } = router.query;

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/dj-rest-auth/password/reset/confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          token,
          new_password1: newPassword1,
          new_password2: newPassword2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data?.new_password2?.[0] || data?.token?.[0] || "Password reset failed.";
        setError(errorMsg);
        return;
      }

      setMessage("Password has been reset! Redirecting to login...");
      setTimeout(() => router.push("/auth"), 3000);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 p-2 rounded text-black"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full mb-4 p-2 rounded text-black"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
          Reset Password
        </button>
      </form>
    </div>
  );
}
