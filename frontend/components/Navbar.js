import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Kaggle Clone</h1>

      {session ? (
        <div className="flex items-center gap-4">
          <p>Welcome, {session.user.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/auth")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
