import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { code } = req.body;

    // Send code to Databricks API (Replace with actual Databricks API)
    const databricksResponse = await axios.post("https://databricks-instance.com/api/execute", {
      code,
    });

    res.status(200).json({ output: databricksResponse.data });
  } catch (error) {
    res.status(500).json({ message: "Execution failed" });
  }
}
