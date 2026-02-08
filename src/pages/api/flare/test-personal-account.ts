import type { NextApiRequest, NextApiResponse } from "next";

import {
  getPersonalAccountAddress,
  getOperatorXrplAddresses,
} from "../../../../packages/flare-smart-accounts-viem/src/utils/smart-accounts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const xrplAddress = "rBMHdVaKfG1o6PSYKsKP1FPRhsUdBVBzX6";

    const personalAccount = await getPersonalAccountAddress(xrplAddress);
    const operatorXrplAddresses = await getOperatorXrplAddresses();

    res.status(200).json({
      xrplAddress,
      personalAccount,
      operatorXrplAddresses,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.message ?? "Flare test failed",
    });
  }
}
