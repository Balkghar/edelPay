import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk } from "xumm-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { payerAddress } = req.body;
    if (!payerAddress) {
      return res.status(400).json({ error: "payerAddress required" });
    }

    if (!process.env.XUMM_KEY || !process.env.XUMM_KEY_SECRET) {
      return res.status(500).json({ error: "XUMM credentials not configured" });
    }

    // First, get the transaction JSON from the approve-fxrp-custom-instructions endpoint
    const approvalResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/flare/approve-fxrp-custom-instructions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payerAddress }),
    });

    if (!approvalResponse.ok) {
      const errorText = await approvalResponse.text();
      throw new Error(`Failed to create FXRP approval transaction: ${errorText}`);
    }

    const approvalData = await approvalResponse.json();

    // Create XUMM payload with the transaction
    const xumm = new XummSdk(process.env.XUMM_KEY, process.env.XUMM_KEY_SECRET);
    
    const payload = await xumm.payload.create({
      txjson: approvalData.txJson,
      options: {
        submit: true,
        multisign: false,
        return_url: {
          web: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/kyc?fxrp_approved=true`
        }
      }
    }, true);

    return res.status(200).json({
      qrUrl: payload.refs.qr_png,
      qrUri: payload.refs.qr_uri,
      payloadUuid: payload.uuid,
      deepLink: payload.next.always,
      txJson: approvalData.txJson
    });

  } catch (err: any) {
    console.error("FXRP approval QR creation error:", err);
    return res.status(500).json({ error: err.message });
  }
}