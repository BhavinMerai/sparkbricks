import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react"; // Import authentication session

export default function NotebookList() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((sess) => setSession(sess));
  }, []);

  const handleNewNotebook = () => {
    if (!session) {
      router.push("/api/auth/signin"); // Redirect to authentication page
    } else {
      router.push("/notebooks/new"); // Proceed if authenticated
    }
  };

  return (
    <div>
      <h1>Your Notebooks</h1>
      <button onClick={handleNewNotebook}>New Notebook</button>
    </div>
  );
}
