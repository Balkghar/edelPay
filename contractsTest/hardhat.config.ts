import "@nomicfoundation/hardhat-ethers";
import "dotenv/config";
import { defineConfig } from "hardhat/config";

// Validate private key
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey || privateKey === "0x1234..." || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
  console.error("\n❌ ERROR: Invalid or missing PRIVATE_KEY in .env file!");
  console.error("Please set a valid Coston2 wallet private key in contractsTest/.env\n");
  console.error(
    "Example format: PRIVATE_KEY=0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\n"
  );
  process.exit(1);
}

export default defineConfig({
  solidity: {
    version: "0.8.28",
  },
  networks: {
    coston2: {
      type: "http",
      url: "https://coston2-api.flare.network/ext/C/rpc",
      accounts: [privateKey],
      chainId: 114,
    },
  },
});
