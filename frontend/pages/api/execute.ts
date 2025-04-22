import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    // Forward Authorization header if present
    const authHeader = req.headers.authorization || "";
    const headers = authHeader ? { Authorization: authHeader } : {};

    const response = await axios.post(
      `${API_BASE_URL}/execute`,
      { code },
      { headers }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error executing code:", error);
    return res.status(500).json({ error: "Failed to execute code" });
  }
}
