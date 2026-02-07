import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Wallet } from "xrpl";
import { XummSdk } from "xumm-sdk";

const textToHex = (text) =>
  Buffer.from(text, "utf8").toString("hex").toUpperCase();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: Client | null = null;

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectAddress } = req.body;
    if (!subjectAddress) {
      return res.status(400).json({ error: "subjectAddress required" });
    }

    if (
      !process.env.ISSUER_SECRET ||
      !process.env.XUMM_KEY ||
      !process.env.XUMM_KEY_SECRET
    ) {
      return res.status(500).json({ error: "Server env missing" });
    }

    client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const issuerWallet = Wallet.fromSeed(process.env.ISSUER_SECRET);
    const issuerAddress = issuerWallet.classicAddress;

    const now = Math.floor(Date.now() / 1000);
    const expiration = now + 365 * 24 * 60 * 60; // 1 year

    const credentialCreateTx = {
      TransactionType: "CredentialCreate",
      Account: issuerAddress,
      Subject: subjectAddress,
      CredentialType: textToHex("KYC_LVL2"),
      Expiration: expiration,
    };

    console.log("📤 Submitting CredentialCreate...");
    console.log(credentialCreateTx);

    const result = await client.submitAndWait(credentialCreateTx, {
      wallet: issuerWallet,
      autofill: true,
    });

    const txResult = result.result?.meta?.TransactionResult;

    if (txResult !== "tesSUCCESS") {
      throw new Error("CredentialCreate failed");
    }

    const xumm = new XummSdk(
      process.env.XUMM_KEY,
      process.env.XUMM_KEY_SECRET
    );

    const tempCredentialAcceptTx = {
      TransactionType: 'CredentialAccept',
      Account: subjectAddress,
      Issuer: issuerAddress,
      CredentialType: textToHex("KYCLVL2"),
    };

    const payload = await xumm.payload.create(
      { txjson: tempCredentialAcceptTx as any },
      true
    );

    return res.status(200).json({ payload });

  } catch (err: any) {
    console.error("credential-offer error:", err);
    return res.status(500).json({ error: err.message });
  } finally {
    if (client) {
      await client.disconnect();
    }
  }
}
