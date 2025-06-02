export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const response = await fetch(`${process.env.DATABRICKS_INSTANCE}/api/2.0/jobs/runs/submit`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DATABRICKS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        run_name: "Notebook Execution",
        existing_cluster_id: process.env.DATABRICKS_CLUSTER_ID,
        notebook_task: {
          notebook_path: process.env.DATABRICKS_NOTEBOOK_PATH,
          base_parameters: { code },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Databricks API Error: ${errorData.error_code || "Unknown error"}`);
    }

    const result = await response.json();
    res.status(200).json({ output: result.run_id ? `Execution started: Run ID ${result.run_id}` : "Execution started" });

  } catch (error) {
    res.status(500).json({ error: `Execution failed: ${error.message}` });
  }
}
  