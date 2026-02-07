export function createCredentialAcceptTx(
  subjectAddress: string,
  issuerAddress: string
) {
  const textToHex = (text: string) =>
    Buffer.from(text, "utf8").toString("hex").toUpperCase();

  return {
    TransactionType: "CredentialAccept",
    Account: subjectAddress,
    Issuer: issuerAddress,
    CredentialType: textToHex("KYC_LVL2"),
  };
}
