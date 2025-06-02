import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // ✅ Import the context
import UserProfileCard from './UserProfileCard'; // Import UserProfileCard

export default function SparkBricksNavbar() {
  const router = useRouter();
  const { userEmail, logout } = useAuth(); // ✅ Use context values

  const handleSignIn = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    logout();
    router.push("/"); // Optionally redirect to home
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            SparkBricks
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/notebooks" className="hover:text-blue-200">Notebooks</Link>
            <Link href="/competitions" className="hover:text-blue-200">Competitions</Link>
            <Link href="/datasets" className="hover:text-blue-200">Datasets</Link>
            <Link href="/discuss" className="hover:text-blue-200">Discuss</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {userEmail ? (
            <>
              <UserProfileCard /> {/* Add UserProfileCard here */}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
