const express = require("express");
const cors = require("cors");
const nodeFetch = require("node-fetch"); // avoid TS fetch conflict

const app = express();
app.use(cors());
app.use(express.json());

// Use 'any' temporarily to stop TS from crying
app.post("/api/start-verification", async (req: any, res: any) => {
  const verificationPayload = req.body;

  try {
    const response = await nodeFetch(`https://verifier.edel-id.ch/api/verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verificationPayload),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to start verification", details: err });
  }
});

app.post("/api/check-verification/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const verificationPayload = req.body;

  try {
    const response = await nodeFetch(`https://verifier.edel-id.ch/api/verification/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(verificationPayload),
    });

    if (!response.body) throw new Error("No response body");

    res.setHeader("Content-Type", "text/event-stream");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value));
    }

    res.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to check verification", details: err });
  }
});

app.listen(8090, () => console.log("Backend running on http://localhost:8090"));
