import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk } from "xumm-sdk";

interface GetPayloadStatusResponse {
  status?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPayloadStatusResponse>
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.XUMM_KEY || !process.env.XUMM_KEY_SECRET) {
      return res.status(500).json({ error: "XUMM API keys not configured" });
    }

    const xumm = new XummSdk(process.env.XUMM_KEY, process.env.XUMM_KEY_SECRET);

    const { payloadId } = req.query;

    if (!payloadId || typeof payloadId !== "string") {
      return res.status(400).json({ error: "Payload ID is required" });
    }

    const status = await xumm.payload.get(payloadId);

    return res.status(200).json({ status });
  } catch (error) {
    console.error("XUMM payload status error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(400).json({ error: errorMessage });
  }
}
