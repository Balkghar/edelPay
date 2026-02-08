import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk } from "xumm-sdk";

interface CreateCustomPayloadResponse {
  payload?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCustomPayloadResponse>
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.XUMM_KEY || !process.env.XUMM_KEY_SECRET) {
      return res.status(500).json({ error: "XUMM API keys not configured" });
    }

    const xumm = new XummSdk(process.env.XUMM_KEY, process.env.XUMM_KEY_SECRET);

    const { txJson } = req.body;

    if (!txJson) {
      return res.status(400).json({ error: "Transaction JSON is required" });
    }

    // Create payload with custom transaction
    const payload = await xumm.payload.create(txJson, true);

    return res.status(200).json({ payload });
  } catch (error) {
    console.error("XUMM custom payload creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(400).json({ error: errorMessage });
  }
}
