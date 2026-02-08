import type { NextApiRequest, NextApiResponse } from "next";
import { encodeFunctionData } from "viem";
import {
  getInstructionFee,
  getOperatorXrplAddresses,
  registerCustomInstruction,
  type CustomInstruction, getPersonalAccountAddress,
} from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { publicClient } from "../../../../packages/flare-smart-accounts-viem/src/utils/client";
import { abi as checkpointAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/Checkpoint";
import { abi as instructionsAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/CustomInstructionsFacet";
import { abi as vaultAbi } from "../../../../packages/flare-smart-accounts-viem/src/abis/Vault";

import { MASTER_ACCOUNT_CONTROLLER_ADDRESS } from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";
import { toHex } from "viem";

async function encodeCustomInstruction(
  instructions: CustomInstruction[],
  walletId: number
) {
  const encoded = (await publicClient.readContract({
    address: MASTER_ACCOUNT_CONTROLLER_ADDRESS,
    abi: instructionsAbi,
    functionName: "encodeCustomInstruction",
    args: [instructions],
  })) as `0x${string}`;

  return ("0xff" +
    toHex(walletId, { size: 1 }).slice(2) +
    encoded.slice(6)) as `0x${string}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const contractAddress = process.env.VAULT_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return res.status(500).json({ error: "Vault contract address not set" });
    }

    const walletId = 0;
    const payerXrplAddress = req.body.payerAddress as string;
    const collateralAmount = req.body.collateralAmount as string;

    const payerPersonalFlareAddress = await getPersonalAccountAddress(
      payerXrplAddress
    )

    const customInstructions: CustomInstruction[] = [
      {
        targetContract: contractAddress as `0x${string}`,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: checkpointAbi,
          functionName: "retrievePeriodCollateral",
          args: [ payerPersonalFlareAddress, BigInt(collateralAmount)],
        }),
      },
    ] as CustomInstruction[];

    await registerCustomInstruction(customInstructions);
    const encodedInstruction = await encodeCustomInstruction(
      customInstructions,
      walletId
    );

    const operatorXrplAddress = (await getOperatorXrplAddresses())[0];
    const instructionFee = await getInstructionFee(encodedInstruction);

    const txJson = {
      TransactionType: "Payment",
      Destination: operatorXrplAddress,
      Amount: instructionFee,
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
