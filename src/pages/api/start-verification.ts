import type { NextApiRequest, NextApiResponse } from "next";

interface StartVerificationRequest {
  verificationClaims: string[];
}

interface StartVerificationResponse {
  id: string;
  verification_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { verificationClaims }: StartVerificationRequest = req.body;

    // Proxy request to backend
    const backendResponse = await fetch("http://localhost:8090/api/start-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationClaims }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const data: StartVerificationResponse = await backendResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Start verification error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: errorMessage });
  }
}