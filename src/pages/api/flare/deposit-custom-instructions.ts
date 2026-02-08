import type { NextApiRequest, NextApiResponse } from "next";
import { encodeFunctionData } from "viem";
import {
  getInstructionFee,
  getOperatorXrplAddresses,
  registerCustomInstruction,
  type CustomInstruction,
  getPersonalAccountAddress,
} from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { account, publicClient } from "../../../../packages/flare-smart-accounts-viem/src/utils/client";
import {
  abi,
  abi as instructionsAbi,
} from "../../../../packages/flare-smart-accounts-viem/src/abis/CustomInstructionsFacet";
import { abi as vaultAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/Vault";

import { MASTER_ACCOUNT_CONTROLLER_ADDRESS } from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { toHex } from "viem";
import { Client, Wallet, xrpToDrops } from "xrpl";
import { sendCustomInstruction } from "../../../../packages/flare-smart-accounts-viem/src/custom-instructions";

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
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    let client: Client | null = null;

    if (!process.env.ISSUER_SECRET) {
      return res.status(500).json({ error: "Server env missing" });
    }

    client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const contractAddress = process.env.VAULT_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return res.status(500).json({ error: "Vault contract address not set" });
    }

    const walletId = 0;

    // En FXRP
    const collateralAmount = req.body.collateralAmount as string;
    const addressVendor = req.body.addressVendor as string;
    const payerAddress = req.body.payerAddress as string;

    // Convert XRPL address to Flare personal account address
    const vendorFlareAddress = (await getPersonalAccountAddress(addressVendor)) as `0x${string}`;
    console.log("Vendor Flare Address:", vendorFlareAddress);
    // FXRP uses 18 decimals (like most ERC20 tokens)
    // collateralAmount comes in drops (XRP smallest unit), convert to FXRP wei
    // 1 drop = 1/1,000,000 XRP
    // For FXRP: need to convert drops to FXRP base units (18 decimals)
    // drops * 10^12 = FXRP wei (because 10^6 drops = 1 XRP, and 10^18 wei = 1 FXRP)
    const depositAmountInWei = process.env.DEPOSIT_AMOUNT;

    const customInstructions: CustomInstruction[] = [
      {
        targetContract: contractAddress as `0x${string}`,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: vaultAbi,
          functionName: "depositCollateral",
          args: [vendorFlareAddress, depositAmountInWei],
        }),
      },
    ] as CustomInstruction[];

    let xrplClient = new Client("wss://s.altnet.rippletest.net:51233");
    const xrplWallet = Wallet.fromSeed(process.env.ISSUER_SEED!);

    await registerCustomInstruction(customInstructions);
    const encodedInstruction = await encodeCustomInstruction(customInstructions, walletId);
    await sendCustomInstruction({
      encodedInstruction,
      xrplClient,
      xrplWallet,
    });

    const operatorXrplAddress = (await getOperatorXrplAddresses())[0];
    const instructionFee = await getInstructionFee(encodedInstruction);

    const txJson = {
      TransactionType: "Payment",
      Account: payerAddress,
      Destination: operatorXrplAddress,
      Amount: instructionFee, // Convert XRP to drops string
      Memos: [
        {
          Memo: {
            MemoData: encodedInstruction.slice(2),
          },
        },
      ],
    };

    return res.status(200).json({ txJson });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
