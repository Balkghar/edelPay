/**
 * FDC (Flare Data Connector) utility functions
 * Based on flare-hardhat-starter/scripts/utils/fdc.ts
 * Adapted for direct ethers.js usage (not Hardhat runtime)
 */

import { ethers } from "ethers";
import { sleep, toUtf8HexString } from "./core";
import {
  getFdcHub,
  getFdcRequestFeeConfigurations,
  getFdcVerification,
  getFlareSystemsManager,
  getRelay,
} from "./getters";

/**
 * Get the fee required for an FDC attestation request
 */
export async function getFdcRequestFee(
  abiEncodedRequest: string,
  provider: ethers.Provider
): Promise<bigint> {
  const fdcRequestFeeConfigurations = await getFdcRequestFeeConfigurations(provider);
  return await fdcRequestFeeConfigurations.getRequestFee(abiEncodedRequest);
}

/**
 * Prepare attestation request by calling the verifier
 */
export async function prepareAttestationRequestBase(
  url: string,
  apiKey: string,
  attestationTypeBase: string,
  sourceIdBase: string,
  requestBody: any
) {
  console.log("Url:", url, "\n");
  const attestationType = toUtf8HexString(attestationTypeBase);
  const sourceId = toUtf8HexString(sourceIdBase);

  const request = {
    attestationType: attestationType,
    sourceId: sourceId,
    requestBody: requestBody,
  };
  console.log("Prepared request:\n", request, "\n");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (response.status !== 200) {
    throw new Error(
      `Response status is not OK, status ${response.status} ${response.statusText}\n`
    );
  }
  console.log("Response status is OK\n");

  return await response.json();
}

/**
 * Calculate the round ID from a transaction receipt (timestamp-based, less accurate)
 * @deprecated Use getRoundIdFromReceipt for event-based extraction instead
 */
export async function calculateRoundId(
  transaction: any,
  provider: ethers.Provider
): Promise<number> {
  const blockNumber = transaction.blockNumber || transaction.receipt?.blockNumber;
  const block = await provider.getBlock(blockNumber);
  const blockTimestamp = BigInt(block!.timestamp);

  const flareSystemsManager = await getFlareSystemsManager(provider);
  const firstVotingRoundStartTs = BigInt(await flareSystemsManager.firstVotingRoundStartTs());
  const votingEpochDurationSeconds = BigInt(await flareSystemsManager.votingEpochDurationSeconds());

  console.log("Block timestamp:", blockTimestamp, "\n");
  console.log("First voting round start ts:", firstVotingRoundStartTs, "\n");
  console.log("Voting epoch duration seconds:", votingEpochDurationSeconds, "\n");

  const roundId = Number((blockTimestamp - firstVotingRoundStartTs) / votingEpochDurationSeconds);
  console.log("Calculated round id:", roundId, "\n");
  console.log(
    "Received round id:",
    Number(await flareSystemsManager.getCurrentVotingEpochId()),
    "\n"
  );
  return roundId;
}

/**
 * Extract round ID from transaction receipt using block timestamp
 * More reliable than calculateRoundId for event-based extraction
 */
export async function getRoundIdFromReceipt(
  receipt: ethers.TransactionReceipt,
  provider: ethers.Provider
): Promise<number> {
  const block = await provider.getBlock(receipt.blockNumber);
  const blockTimestamp = BigInt(block!.timestamp);

  const flareSystemsManager = await getFlareSystemsManager(provider);
  const firstVotingRoundStartTs = BigInt(await flareSystemsManager.firstVotingRoundStartTs());
  const votingEpochDurationSeconds = BigInt(await flareSystemsManager.votingEpochDurationSeconds());

  const roundId = Number((blockTimestamp - firstVotingRoundStartTs) / votingEpochDurationSeconds);
  console.log("✓ Round ID extracted from receipt:", roundId);
  return roundId;
}

/**
 * Submit attestation request to FDC Hub and return the round ID (event-based)
 */
export async function submitAttestationRequest(
  abiEncodedRequest: string,
  wallet: ethers.Signer,
  networkName: string = "coston2"
): Promise<number> {
  const provider = wallet.provider!;
  const fdcHub = await getFdcHub(wallet);
  const requestFee = await getFdcRequestFee(abiEncodedRequest, provider);

  console.log("📡 Submitting attestation request to FDC Hub...");
  const transaction = await fdcHub.requestAttestation(abiEncodedRequest, {
    value: requestFee,
  });
  console.log("✓ Transaction submitted:", transaction.hash);

  const receipt = await transaction.wait();
  console.log("✓ Transaction confirmed in block:", receipt!.blockNumber);

  // Extract round ID from receipt using block timestamp
  const roundId = await getRoundIdFromReceipt(receipt!, provider);
  console.log(
    `🔗 Track round progress: https://${networkName}-systems-explorer.flare.rocks/voting-round/${roundId}?tab=fdc\n`
  );
  return roundId;
}

/**
 * Post request to DA Layer
 */
export async function postRequestToDALayer(
  url: string,
  request: any,
  watchStatus: boolean = false
): Promise<any> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  console.log("📥 DA Layer response status:", response.status);
  if (watchStatus && response.status !== 200) {
    throw new Error(
      `Response status is not OK, status ${response.status} ${response.statusText}\n ${response}\n`
    );
  } else if (watchStatus) {
    console.log("Response status is OK\n");
  }

  return await response.json();
}

/**
 * Wait for a round to finalize with improved polling
 */
export async function waitForRoundFinalization(
  roundId: number,
  provider: ethers.Provider,
  pollIntervalMs: number = 15000
): Promise<void> {
  console.log(`⏳ Waiting for round ${roundId} to finalize...`);

  const relay = await getRelay(provider);
  const fdcVerification = await getFdcVerification(provider);
  const protocolId = await fdcVerification.fdcProtocolId();

  let attempts = 0;
  const maxAttempts = 20; // 20 * 15s = 5 minutes max

  while (attempts < maxAttempts) {
    const isFinalized = await relay.isFinalized(protocolId, roundId);

    if (isFinalized) {
      console.log(`✓ Round ${roundId} finalized after ${(attempts * pollIntervalMs) / 1000}s\n`);
      return;
    }

    attempts++;
    if (attempts < maxAttempts) {
      console.log(`  Checking finalization... (${attempts}/${maxAttempts})`);
      await sleep(pollIntervalMs);
    }
  }

  throw new Error(
    `Round ${roundId} did not finalize within ${(maxAttempts * pollIntervalMs) / 1000} seconds`
  );
}

/**
 * Retrieve data and proof from DA Layer (base implementation)
 * Note: This assumes the round already exists and is/will be finalized
 */
export async function retrieveDataAndProofBase(
  url: string,
  abiEncodedRequest: string,
  roundId: number,
  provider: ethers.Provider
): Promise<any> {
  // Wait for round finalization
  await waitForRoundFinalization(roundId, provider);

  const request = {
    votingRoundId: roundId,
    requestBytes: abiEncodedRequest,
  };

  console.log("📥 Fetching proof from DA Layer...");

  // Initial wait for DA Layer indexing
  await sleep(20000);

  const maxProofAttempts = 10;
  for (let i = 0; i < maxProofAttempts; i++) {
    try {
      const proof = await postRequestToDALayer(url, request, false);

      if (proof.response_hex !== undefined && proof.proof !== undefined) {
        console.log("✓ Proof retrieved successfully!\n");
        return proof;
      }

      console.log(`  Proof not ready yet... (${i + 1}/${maxProofAttempts})`);
      await sleep(15000);
    } catch (error: any) {
      console.log(`  DA Layer error (${i + 1}/${maxProofAttempts}):`, error.message);
      if (i < maxProofAttempts - 1) {
        await sleep(15000);
      }
    }
  }

  throw new Error("Failed to retrieve proof from DA Layer after all attempts");
}

/**
 * Retrieve data and proof with retry logic
 */
export async function retrieveDataAndProofBaseWithRetry(
  url: string,
  abiEncodedRequest: string,
  roundId: number,
  provider: ethers.Provider,
  attempts: number = 10
): Promise<any> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await retrieveDataAndProofBase(url, abiEncodedRequest, roundId, provider);
    } catch (e: any) {
      console.log(`\n⚠️  Attempt ${i + 1}/${attempts} failed:`, e.message);
      if (i < attempts - 1) {
        console.log("   Retrying in 20 seconds...\n");
        await sleep(20000);
      }
    }
  }
  throw new Error(`Failed to retrieve data and proofs after ${attempts} attempts`);
}

/**
 * END-TO-END: Complete FDC workflow from submission to proof retrieval
 *
 * This function combines:
 * 1. Submitting the attestation request to FDC Hub (gets round ID from event)
 * 2. Waiting for the round to finalize
 * 3. Retrieving the proof from DA Layer
 *
 * @param abiEncodedRequest - The encoded attestation request
 * @param wallet - Ethers signer with funds for request fee
 * @param daLayerUrl - DA Layer API endpoint (e.g., "https://coston2-data-availability.flare.network/api/v1/fdc/proof-by-request-round-raw")
 * @param networkName - Network name for explorer links (default: "coston2")
 * @param maxRetries - Maximum retry attempts for proof retrieval (default: 3)
 * @returns Object containing roundId and proof data
 */
export async function submitAndRetrieveProof(
  abiEncodedRequest: string,
  wallet: ethers.Signer,
  daLayerUrl: string,
  networkName: string = "coston2",
  maxRetries: number = 3
): Promise<{ roundId: number; proof: any }> {
  const provider = wallet.provider!;

  console.log("\n" + "=".repeat(70));
  console.log("🚀 STARTING END-TO-END FDC PROOF WORKFLOW");
  console.log("=".repeat(70) + "\n");

  // Step 1: Submit attestation request and get round ID from event
  console.log("[1/3] Submitting attestation request...");
  const roundId = await submitAttestationRequest(abiEncodedRequest, wallet, networkName);
  console.log(`✓ Round ID: ${roundId}\n`);

  // Step 2: Wait for round finalization
  console.log("[2/3] Waiting for round finalization...");
  await waitForRoundFinalization(roundId, provider, 15000);

  // Step 3: Retrieve proof from DA Layer with retries
  console.log("[3/3] Retrieving proof from DA Layer...");
  const proof = await retrieveDataAndProofBaseWithRetry(
    daLayerUrl,
    abiEncodedRequest,
    roundId,
    provider,
    maxRetries
  );

  console.log("\n" + "=".repeat(70));
  console.log("✅ FDC WORKFLOW COMPLETED SUCCESSFULLY");
  console.log("=".repeat(70));
  console.log(`📊 Round ID: ${roundId}`);
  console.log(`📦 Proof merkle path length: ${proof.proof?.length || 0}`);
  console.log(`📄 Response hex length: ${proof.response_hex?.length || 0}`);
  console.log("=".repeat(70) + "\n");

  return { roundId, proof };
}
