// pages/verify-email/[key].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { key } = router.query;
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (!key) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/dj-rest-auth/registration/verify-email/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage("✅ Email verified! You can now log in.");
        } else {
          setMessage("❌ Verification failed. " + (data.detail || ""));
        }
      } catch (err) {
        setMessage("❌ Network error. Try again.");
      }
    };

    verifyEmail();
  }, [key]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
