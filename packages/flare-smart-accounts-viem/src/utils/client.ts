import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { flareTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: flareTestnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: flareTestnet,
  transport: http(),
});

export const account = privateKeyToAccount("0x13b60f47e4a4018d13800d3fd17123ea47553fb4e273332dbe235279c6456d90");
