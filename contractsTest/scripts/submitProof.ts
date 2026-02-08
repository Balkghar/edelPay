// scripts/submitProof.ts
// FDC proof generation and submission
// Based on official flare-hardhat-starter pattern

import "dotenv/config";
import { ethers } from "ethers";
import { prepareAttestationRequestBase, submitAndRetrieveProof } from "./utils/fdc";

// Load environment variables
const {
  VERIFIER_URL_TESTNET,
  VERIFIER_API_KEY_TESTNET,
  COSTON2_DA_LAYER_URL,
  CONTRACT_ADDRESS,
  API_URL,
  PRIVATE_KEY,
} = process.env;

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider("https://coston2-api.flare.network/ext/C/rpc");
const wallet = new ethers.Wallet(PRIVATE_KEY!, provider);

// ==============================================
// CONFIGURE YOUR API REQUEST
// ==============================================
const apiUrl = API_URL || "https://your-api.com/api/status";
const postProcessJq = `{status: .status, timestamp: .timestamp}`;
const httpMethod = "GET";
const headers = "{}";
const queryParams = "{}";
const body = "{}";

// ABI signature matching your API response structure
const abiSignature =
  '{"components":[{"internalType":"bool","name":"status","type":"bool"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"task","type":"tuple"}';

// FDC Configuration
const attestationTypeBase = "Web2Json";
const sourceIdBase = "PublicWeb2";
const verifierUrlBase = VERIFIER_URL_TESTNET;

// ==============================================
// MAIN EXECUTION
// ==============================================

/**
 * Main function - orchestrates the FDC proof generation workflow
 * Following official flare-hardhat-starter pattern
 */
async function main() {
  console.log("=".repeat(70));
  console.log("🔄 FDC PROOF GENERATION AND SUBMISSION");
  console.log("   Using official Flare pattern from flare-hardhat-starter");
  console.log("=".repeat(70), "\n");

  try {
    // Step 1: Prepare attestation request
    const requestBody = {
      url: apiUrl,
      httpMethod: httpMethod,
      headers: headers,
      queryParams: queryParams,
      body: body,
      postProcessJq: postProcessJq,
      abiSignature: abiSignature,
    };

    const url = `${verifierUrlBase}/verifier/web2/Web2Json/prepareRequest`;

    console.log("📝 Preparing attestation request...");
    const data = await prepareAttestationRequestBase(
      url,
      VERIFIER_API_KEY_TESTNET!,
      attestationTypeBase,
      sourceIdBase,
      requestBody
    );

    console.log("✅ Attestation request prepared");
    console.log("📋 Response data keys:", Object.keys(data).join(", "));

    if (!data.abiEncodedRequest) {
      throw new Error("❌ No abiEncodedRequest in response!");
    }

    console.log(
      "✅ ABI Encoded Request received:",
      data.abiEncodedRequest.substring(0, 66) + "...\n"
    );

    // Step 2-4: End-to-end workflow (submit → wait for finalization → retrieve proof)
    const daLayerUrl = `${COSTON2_DA_LAYER_URL}/api/v1/fdc/proof-by-request-round-raw`;
    const { roundId, proof } = await submitAndRetrieveProof(
      data.abiEncodedRequest,
      wallet,
      daLayerUrl,
      "coston2",
      3 // max retries
    );

    // Step 5: Submit proof to contract (if CONTRACT_ADDRESS is set)
    if (CONTRACT_ADDRESS) {
      console.log("\n📤 Submitting proof to contract...");
      await submitProofToContract(proof, CONTRACT_ADDRESS);
    } else {
      console.log("\n💡 To submit the proof to your contract:");
      console.log("   1. Set CONTRACT_ADDRESS in .env");
      console.log("   2. Run the script again");
      console.log("\n✅ Proof data saved. You can manually submit it using:");
      console.log("   contract.addVerifiedStatus(proofBundle)");
    }

    console.log("\n" + "=".repeat(70));
    console.log("🎉 PROCESS COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(70));
  } catch (error: any) {
    console.log("\n" + "=".repeat(70));
    console.log("❌ ERROR");
    console.log("=".repeat(70));
    console.log("\n", error.message);
    if (error.stack) {
      console.log("\nStack trace:", error.stack);
    }
    process.exit(1);
  }
}

/**
 * Submit proof to your deployed contract
 */
async function submitProofToContract(proof: any, contractAddress: string) {
  const contractAbi = [
    "function addVerifiedStatus(tuple(bytes32[] merkleProof, tuple(uint64 votingRound, bytes32 id, bytes32 value) data) _proof) external",
  ];

  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

  // Decode the response_hex to get the structured data
  // This depends on your contract's expected proof format
  const proofBundle = {
    merkleProof: proof.proof,
    data: proof.response_hex, // May need decoding based on your contract
  };

  console.log("📡 Sending proof to contract:", contractAddress);
  const tx = await contract.addVerifiedStatus(proofBundle);
  console.log("✅ Transaction submitted:", tx.hash);

  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed in block:", receipt?.blockNumber);
}

// ==============================================
// RUN SCRIPT
// ==============================================
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
