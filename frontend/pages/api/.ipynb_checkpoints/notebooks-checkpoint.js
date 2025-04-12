export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:8888/api/contents/", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notebooks");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
