import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Verification ID is required" });
  }

  try {
    // Set headers for SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    });

    // Create a request to the backend SSE endpoint
    const backendUrl = `http://localhost:8090/api/check-verification/${id}`;
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
      },
      body: JSON.stringify({
        verificationClaims: ["$.age_over_18", "$.given_name", "$.family_name"]
      }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend SSE error: ${backendResponse.status}`);
    }

    // Stream the backend response to the client
    const reader = backendResponse.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Failed to get reader from backend response");
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        
        // Forward the SSE data to the client
        res.write(chunk);
        
        // Parse chunk to check if verification is complete
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.state === 'SUCCESS' || data.state === 'FAILED') {
                // Close connection when verification is complete
                reader.cancel();
                return res.end();
              }
            } catch (e) {
              // Continue if JSON parsing fails
            }
          }
        }
      }
    } finally {
      reader.cancel();
      res.end();
    }

  } catch (error) {
    console.error("SSE proxy error:", error);
    res.write(`data: ${JSON.stringify({ 
      state: "FAILED", 
      error: error instanceof Error ? error.message : "Unknown error" 
    })}\n\n`);
    res.end();
  }
}