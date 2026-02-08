import type { NextApiRequest, NextApiResponse } from "next";
import { encodeFunctionData } from "viem";
import {
  getInstructionFee,
  getOperatorXrplAddresses,
  registerCustomInstruction,
  type CustomInstruction,
  getPersonalAccountAddress,
} from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { publicClient } from "../../../../packages/flare-smart-accounts-viem/src/utils/client";
import { abi as instructionsAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/CustomInstructionsFacet";
import { abi as vaultAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/Vault";
import { Client, Wallet, xrpToDrops } from "xrpl";

import { MASTER_ACCOUNT_CONTROLLER_ADDRESS } from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { toHex } from "viem";

const textToHex = (text: string) => Buffer.from(text, "utf8").toString("hex").toUpperCase();

// VA ETRE SIGNER PAR PLATFORM
async function encodeCustomInstruction(instructions: CustomInstruction[], walletId: number) {
  const encoded = (await publicClient.readContract({
    address: MASTER_ACCOUNT_CONTROLLER_ADDRESS,
    abi: instructionsAbi,
    functionName: "encodeCustomInstruction",
    args: [instructions],
  })) as `0x${string}`;

  return ("0xff" + toHex(walletId, { size: 1 }).slice(2) + encoded.slice(6)) as `0x${string}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let client: Client | null = null;

    if (req.method !== "POST") {
      return res.status(405).end();
    }

    if (!process.env.ISSUER_SECRET) {
      return res.status(500).json({ error: "Server env missing" });
    }

    client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const issuerWallet = Wallet.fromSeed(process.env.ISSUER_SECRET);

    const contractAddress = process.env.VAULT_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return res.status(500).json({ error: "Vault contract address not set" });
    }

    const walletId = 0;

    const vendorXrplAddress = req.body.vendorAddress as string;
    const payerXrplAddress = req.body.payerAddress as string;

    // Convertit les adresses XRPL en adresses Flare
    const vendorFlareAddress = await getPersonalAccountAddress(vendorXrplAddress);
    const payerFlareAddress = await getPersonalAccountAddress(payerXrplAddress);

    const customInstructions: CustomInstruction[] = [
      {
        targetContract: contractAddress as `0x${string}`,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: vaultAbi,
          functionName: "addVendorPayer",
          args: [vendorFlareAddress as `0x${string}`, payerFlareAddress as `0x${string}`],
        }),
      },
    ] as CustomInstruction[];

    await registerCustomInstruction(customInstructions);
    const encodedInstruction = await encodeCustomInstruction(customInstructions, walletId);

    const operatorXrplAddress = (await getOperatorXrplAddresses())[0];
    const instructionFee = await getInstructionFee(encodedInstruction);

    const txJson = {
      TransactionType: "Payment",
      Account: issuerWallet.address,
      Destination: operatorXrplAddress,
      Amount: xrpToDrops(instructionFee), // Convert XRP to drops string
      Memos: [
        {
          Memo: {
            MemoData: encodedInstruction.slice(2),
          },
        },
      ],
    };

    const result = await client.submitAndWait(txJson as any, {
      wallet: issuerWallet,
      autofill: true,
    });

    if (
      result.result?.meta &&
      typeof result.result.meta !== "string" &&
      result.result.meta.TransactionResult === "tesSUCCESS"
    ) {
      return res.status(200).json({ message: "Transaction successful", details: result });
    } else {
      return res.status(500).json({ error: "Transaction failed", details: result });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
