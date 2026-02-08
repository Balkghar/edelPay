// FDC Helper Functions based on official Flare examples
// https://github.com/flare-foundation/flare-hardhat-starter

import axios from "axios";
import { ethers } from "ethers";

/**
 * Helper to wait/sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for voting round to finalize using the Relay contract
 * Now accepts relay contract instance as parameter
 */
export async function waitForRoundFinalization(
  roundId: number,
  relay: ethers.Contract,
  fdcProtocolId: number = 100
): Promise<void> {
  console.log("\n⏳ Waiting for voting round to finalize...");
  console.log("📋 Round ID:", roundId);
  console.log("⏰ This typically takes 90-180 seconds (1.5-3 minutes)");

  let attempt = 0;
  const maxAttempts = 20; // 20 attempts * 15 seconds = 5 minutes max

  while (attempt < maxAttempts) {
    attempt++;

    const isFinalized = await relay.isFinalized(fdcProtocolId, roundId);

    if (isFinalized) {
      console.log("✅ Round finalized!\n");
      return;
    }

    console.log(
      `⏳ Attempt ${attempt}/${maxAttempts}: Round not finalized yet, waiting 15 seconds...`
    );
    await sleep(15000); // Check every 15 seconds
  }

  throw new Error("Round finalization timeout - waited 5 minutes");
}

/**
 * Retrieve proof from Data Availability Layer
 * Based on official Flare examples
 * Uses longer waits and more retries for reliability
 */
export async function retrieveProofFromDALayer(
  abiEncodedRequest: string,
  roundId: number,
  daLayerUrl: string,
  relay: ethers.Contract,
  fdcProtocolId: number = 100,
  maxAttempts: number = 15 // Increased from 10
): Promise<any> {
  const url = `${daLayerUrl}/api/v1/fdc/proof-by-request-round-raw`;

  console.log("\n🔍 Retrieving proof from Data Availability Layer...");
  console.log("🔗 DA Layer URL:", url);
  console.log("📋 Round ID:", roundId);

  // Wait for round to finalize first
  await waitForRoundFinalization(roundId, relay, fdcProtocolId);

  // Build the request body
  const requestBody = {
    votingRoundId: roundId,
    requestBytes: abiEncodedRequest,
  };

  console.log("📦 Request body:", JSON.stringify(requestBody, null, 2));

  // Add a longer delay after finalization before requesting proof (official examples use 20s+)
  console.log("⏳ Waiting 20 seconds for DA Layer to index the proof...");
  await sleep(20000);

  // Poll the DA Layer until proof is available
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`\n🔄 Proof retrieval attempt ${attempt}/${maxAttempts}...`);

      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📥 DA Layer response status:", response.status);
      console.log("📄 Response data keys:", Object.keys(response.data).join(", "));

      // Check if proof is available
      if (response.data && response.data.response_hex !== undefined) {
        console.log("✅ Proof retrieved successfully!");
        console.log("📊 Proof data:");
        console.log("   - Merkle proof length:", response.data.proof?.length || 0);
        console.log("   - Response hex length:", response.data.response_hex?.length || 0);
        return response.data;
      }

      console.log("⏳ Proof not ready yet (response_hex undefined)");

      if (attempt < maxAttempts) {
        console.log("⏰ Waiting 20 seconds before retry...");
        await sleep(20000); // Increased from 10s to 20s (official examples use 20s)
      }
    } catch (error: any) {
      console.log(`⚠️  Attempt ${attempt} failed:`, error.message);

      if (error.response) {
        console.error("📛 Response status:", error.response.status);
        console.error("📛 Response data:", JSON.stringify(error.response.data, null, 2));
      }

      if (attempt < maxAttempts) {
        console.log("⏰ Waiting 20 seconds before retry...");
        await sleep(20000); // Increased from 10s to 20 s
      }
    }
  }

  throw new Error(
    `Failed to retrieve proof after ${maxAttempts} attempts. The proof may not be available yet. Try checking the round manually at: https://coston2-systems-explorer.flare.rocks/voting-round/${roundId}?tab=fdc`
  );
}
