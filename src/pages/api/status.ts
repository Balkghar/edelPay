import type { NextApiRequest, NextApiResponse } from "next";

interface StatusResponse {
  status: boolean;
  message?: string;
  timestamp?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse>
) {
  try {
    // Support both GET and POST methods
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ 
        status: false, 
        message: "Only GET and POST requests allowed" 
      });
    }

    // You can customize this logic as needed
    const shouldReturnTrue = Math.random() > 0.5; // Random true/false for demo
    
    // Or you could base it on query parameters:
    // const forceTrue = req.query.force === 'true';
    // const shouldReturnTrue = forceTrue || Math.random() > 0.5;

    return res.status(200).json({
      status: shouldReturnTrue,
      message: shouldReturnTrue ? "Operation successful" : "Operation failed",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return res.status(500).json({
      status: false,
      message: `Server error: ${errorMessage}`
    });
  }
}