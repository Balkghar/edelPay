import { createCredentialOfferTx } from "@/lib/xrpl/createCredentialOfferTx";
import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk } from "xumm-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectAddress } = req.body;

    if (!subjectAddress) {
      return res.status(400).json({ error: "subjectAddress required" });
    }

    if (!process.env.XUMM_KEY || !process.env.XUMM_KEY_SECRET) {
      return res.status(500).json({ error: "XUMM keys missing" });
    }

    if (!process.env.ISSUER_SECRET) {
      return res.status(500).json({ error: "ISSUER_SECRET missing" });
    }

    // 1️⃣ créer le txjson XRPL
    const txjson = createCredentialOfferTx(subjectAddress, process.env.ISSUER_SECRET);

    // 2️⃣ créer le payload XUMM
    const xumm = new XummSdk(process.env.XUMM_KEY, process.env.XUMM_KEY_SECRET);

    // Pass the transaction directly, not wrapped in an object
    const payload = await xumm.payload.create(txjson, true);

    // 3️⃣ renvoyer le payload
    return res.status(200).json({ payload });
  } catch (err: any) {
    console.error("credential-offer error:", err);
    return res.status(500).json({ error: err.message });
  }
}
