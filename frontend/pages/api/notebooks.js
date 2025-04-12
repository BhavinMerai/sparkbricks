export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    // Simulate code execution (Replace this with actual execution logic)
    const output = `Executed code: ${code}`;

    return res.status(200).json({ output });
  } catch (error) {
    console.error("Execution error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
