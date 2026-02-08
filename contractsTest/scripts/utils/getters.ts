/**
 * Contract getter functions
 * Based on flare-hardhat-starter/scripts/utils/getters.ts
 * Adapted for direct ethers.js usage (not Hardhat runtime)
 */

import { ethers } from "ethers";

const FLARE_CONTRACT_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

/**
 * Get the Flare Contract Registry
 */
export async function getFlareContractRegistry(provider: ethers.Provider) {
  const registryAbi = [
    "function getContractAddressByName(string memory _name) external view returns (address)",
  ];
  return new ethers.Contract(FLARE_CONTRACT_REGISTRY_ADDRESS, registryAbi, provider);
}

/**
 * Get contract address by name from the registry
 */
export async function getContractAddressByName(
  name: string,
  provider: ethers.Provider
): Promise<string> {
  const registry = await getFlareContractRegistry(provider);
  return await registry.getContractAddressByName(name);
}

/**
 * Get FlareSystemsManager contract instance
 */
export async function getFlareSystemsManager(providerOrSigner: ethers.Provider | ethers.Signer) {
  const provider = "provider" in providerOrSigner ? providerOrSigner.provider! : providerOrSigner;
  const address = await getContractAddressByName("FlareSystemsManager", provider);

  const abi = [
    "function firstVotingRoundStartTs() external view returns (uint64)",
    "function votingEpochDurationSeconds() external view returns (uint64)",
    "function getCurrentVotingEpochId() external view returns (uint256)",
  ];

  return new ethers.Contract(address, abi, providerOrSigner);
}

/**
 * Get FDC Hub contract instance
 */
export async function getFdcHub(providerOrSigner: ethers.Provider | ethers.Signer) {
  const provider = "provider" in providerOrSigner ? providerOrSigner.provider! : providerOrSigner;
  const address = await getContractAddressByName("FdcHub", provider);

  const abi = [
    "function requestAttestation(bytes calldata data) external payable returns (uint256)",
    "event AttestationRequest(bytes data, uint256 fee)",
  ];

  return new ethers.Contract(address, abi, providerOrSigner);
}

/**
 * Get Relay contract instance
 */
export async function getRelay(provider: ethers.Provider) {
  const address = await getContractAddressByName("Relay", provider);

  const abi = [
    "function isFinalized(uint256 _protocolId, uint256 _votingRoundId) external view returns (bool)",
  ];

  return new ethers.Contract(address, abi, provider);
}

/**
 * Get FDC Verification contract instance
 */
export async function getFdcVerification(provider: ethers.Provider) {
  const address = await getContractAddressByName("FdcVerification", provider);

  const abi = ["function fdcProtocolId() external view returns (uint256)"];

  return new ethers.Contract(address, abi, provider);
}

/**
 * Get FDC Request Fee Configurations contract instance
 */
export async function getFdcRequestFeeConfigurations(provider: ethers.Provider) {
  const address = await getContractAddressByName("FdcRequestFeeConfigurations", provider);

  const abi = ["function getRequestFee(bytes calldata _data) external view returns (uint256)"];

  return new ethers.Contract(address, abi, provider);
}
