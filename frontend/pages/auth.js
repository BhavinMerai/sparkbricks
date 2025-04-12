import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session Data:", session);
    if (session) {
      router.push("/"); // Redirect to homepage if logged in
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Sign In / Sign Up</h2>
        <p className="text-gray-400 mb-6">Choose a sign-in method:</p>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 w-full bg-red-500 text-white px-4 py-2 rounded-md mb-3"
        >
          <FaGoogle /> Sign in with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-3 w-full bg-gray-800 text-white px-4 py-2 rounded-md mb-3"
        >
          <FaGithub /> Sign in with GitHub
        </button>

        <hr className="my-4 border-gray-600" />

        <button
          onClick={() => signIn("credentials")}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sign in with Email
        </button>
      </div>
    </div>
  );
}
