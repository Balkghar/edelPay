import { Client, Wallet } from "xrpl";

/**
 * ============================
 * CONFIG
 * ============================
 */

// XRPL testnet
const XRPL_WS = "wss://s.altnet.rippletest.net:51233";

// ⚠️ WALLET XRPL (seed de test)
const XRPL_SEED = "sEdTjZgNWrZgWhd7mTpYUcp2erwJKyU";

// Operator XRPL address (celui de la démo)
const OPERATOR_XRPL_ADDRESS = "rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq";

// Smart account Flare (TON personal account)
const PERSONAL_ACCOUNT = "0x9937188C7EC68B2EEABB7ad95796a3bD88000435";

/**
 * ============================
 * FXRP COLLATERAL RESERVATION
 * instructionId = 0x00
 *
 * byte 0  : instructionId
 * byte 1  : walletId
 * bytes 2–11  : value (10 bytes)
 * bytes 12–13 : agentVaultId (uint16)
 * bytes 14–31 : padding
 * ============================
 */
function buildFxrpCollateralReservationMemo({
                                                walletId,
                                                value,
                                                agentVaultId,
                                            }: {
    walletId: number;
    value: bigint;
    agentVaultId: number;
}): string {
    const buf = Buffer.alloc(32);

    // byte 0: FXRP collateral reservation
    buf[0] = 0x00;

    // byte 1: walletId
    buf[1] = walletId;

    // bytes 2–11: value (10 bytes, big-endian)
    const valueHex = value.toString(16).padStart(20, "0");
    Buffer.from(valueHex, "hex").copy(buf, 2);

    // bytes 12–13: agentVaultId (uint16 big-endian)
    buf.writeUInt16BE(agentVaultId, 12);

    // rest is zero padding
    return buf.toString("hex");
}

/**
 * ============================
 * MAIN
 * ============================
 */
async function main() {
    console.log("=== FAssets FXRP Collateral Reservation Demo ===");

    // XRPL client
    const xrplClient = new Client(XRPL_WS);
    await xrplClient.connect();

    // XRPL wallet
    const xrplWallet = Wallet.fromSeed(XRPL_SEED);
    console.log("XRPL wallet:", xrplWallet.address);

    // ⚠️ PARAMÈTRES DÉMO
    const walletId = 1;          // PAS 0
    const value = 1_000_000n;    // lots FXRP (valeur simple)
    const agentVaultId = 0;      // généralement 0 en démo

    const memoHex = buildFxrpCollateralReservationMemo({
        walletId,
        value,
        agentVaultId,
    });

    console.log("Personal account (Flare):", PERSONAL_ACCOUNT);
    console.log("FXRP Collateral Reservation Memo (32 bytes):", memoHex);

    // XRPL Payment
    const tx = {
        TransactionType: "Payment",
        Account: xrplWallet.address,
        Destination: OPERATOR_XRPL_ADDRESS,
        Amount: "1000", // 0.001 XRP = fee opérateur
        Memos: [
            {
                Memo: {
                    MemoData: memoHex,
                },
            },
        ],
    };

    console.log("Sending XRPL payment to operator...");
    const prepared = await xrplClient.autofill(tx);
    const signed = xrplWallet.sign(prepared);
    const result = await xrplClient.submitAndWait(signed.tx_blob);

    console.log("XRPL tx result:", result.result.meta.TransactionResult);
    console.log("XRPL tx hash:", result.result.hash);

    await xrplClient.disconnect();

    console.log("\nDONE.");
    console.log("➡️ Maintenant regarde l’explorer Flare sur :");
    console.log(PERSONAL_ACCOUNT);
    console.log("Attends 30s à 2 min.");
}

main().catch(console.error);
