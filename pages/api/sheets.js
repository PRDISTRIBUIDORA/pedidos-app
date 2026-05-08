const GAS_URL = "https://script.google.com/macros/s/AKfycbw9Kx5hPdZIFkPuuGJMuttzJt6H_8CAdMwgn7b36qpoEJiqckNfwHO2NmxtB5dnVrL12A/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  try {
    const qs = new URLSearchParams(req.query).toString();
    const url = qs ? `${GAS_URL}?${qs}` : GAS_URL;
    if (req.method === "GET") {
      const r = await fetch(url);
      return res.json(await r.json());
    }
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    return res.json(await r.json());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
