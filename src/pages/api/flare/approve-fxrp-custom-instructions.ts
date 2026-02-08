import type { NextApiRequest, NextApiResponse } from "next";
import { encodeFunctionData, erc20Abi } from "viem";
import {
  getInstructionFee,
  getOperatorXrplAddresses,
  registerCustomInstruction,
  type CustomInstruction,
  getPersonalAccountAddress,
} from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { publicClient } from "../../../../packages/flare-smart-accounts-viem/src/utils/client";
import { abi as instructionsAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/CustomInstructionsFacet";
import { MASTER_ACCOUNT_CONTROLLER_ADDRESS } from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { toHex } from "viem";
import { xrpToDrops } from "xrpl";

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

    // Adresse du token fXRP sur Coston2
    const FXRP_TOKEN_ADDRESS = process.env.FXRP_CONTRACT_ADDRESS;

    // Adresse de ton contrat vault
    const vaultAddress = process.env.VAULT_CONTRACT_ADDRESS;
    if (!vaultAddress) {
      return res.status(500).json({ error: "Vault contract address not set" });
    }

    const walletId = 0;
    const payerXrplAddress = req.body.payerAddress as string;

    console.log(`🔄 Processing FXRP approval for: ${payerXrplAddress}`);

    const payerPersonalFlareAddress = await getPersonalAccountAddress(
      payerXrplAddress
    );

    console.log(`✅ Personal account address: ${payerPersonalFlareAddress}`);

    const approveAmount = 10000000;

    const customInstructions: CustomInstruction[] = [
      {
        targetContract: FXRP_TOKEN_ADDRESS as `0x${string}`,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "approve",
          args: [vaultAddress as `0x${string}`, BigInt(approveAmount)],
        }),
      },
    ] as CustomInstruction[];

    console.log(`📝 Custom instructions created`);

    await registerCustomInstruction(customInstructions);
    const encodedInstruction = await encodeCustomInstruction(customInstructions, walletId);

    console.log(`✅ Encoded instruction: ${encodedInstruction}`);

    const operatorXrplAddress = (await getOperatorXrplAddresses())[0];
    const instructionFee = await getInstructionFee(encodedInstruction);

    console.log(`💰 Instruction fee: ${instructionFee} XRP`);

    const txJson = {
      TransactionType: "Payment",
      Account: payerXrplAddress,
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

    console.log(`✅ Transaction JSON prepared for signature`);

    return res.status(200).json({ 
      txJson,
      message: "FXRP approval transaction ready for signing"
    });
  } catch (err: any) {
    console.error(`❌ Error in approve-fxrp-custom-instructions:`, err);
    return res.status(500).json({ 
      error: err.message || "Failed to create FXRP approval transaction",
      details: err.toString()
    });
  }
}
