import { Wallet } from "xrpl";

export function createCredentialOfferTx(
  subjectAddress: string,
  issuerSeed: string
) {
  const wallet = Wallet.fromSeed(issuerSeed);

  const textToHex = (text: string) =>
    Buffer.from(text, "utf8").toString("hex").toUpperCase();

  const now = Math.floor(Date.now() / 1000);

  return {
    TransactionType: "CredentialCreate",
    Account: wallet.classicAddress,
    Subject: subjectAddress,
    CredentialType: textToHex("KYC_LEVEL"),
    Expiration: now + 365 * 24 * 3600,
    Memos: [
      {
        Memo: {
          MemoData: textToHex(`Offer KYC credential to ${subjectAddress}`)
        }
      }
    ]
  };
}
