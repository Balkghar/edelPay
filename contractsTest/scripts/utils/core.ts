/**
 * Core utility functions
 * Based on flare-hardhat-starter/scripts/utils/core.ts
 */

/**
 * Converts a UTF-8 string to a hex string (padded to 32 bytes)
 */
export function toUtf8HexString(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let hex = "0x";
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0");
  }
  // Pad to 32 bytes (64 hex chars after 0x)
  return hex.padEnd(66, "0");
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
