import { useRouter } from "next/router";

const NotebookPage = () => {
  const router = useRouter();
  const { notebook } = router.query;

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Home Button */}
      <div style={{ padding: "10px", background: "#333", color: "#fff", textAlign: "left" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ⬅ Home
        </button>
      </div>

      {/* JupyterLab iframe */}
      <iframe
        src={`http://localhost:8888/lab`} // JupyterLab URL
        width="100%"
        height="100%"
        style={{ border: "none", flex: 1 }}
      />
    </div>
  );
};

export default NotebookPage;
