// typescript
import { Wallet } from "xrpl";
import { getPersonalAccountAddress } from "./utils/smart-accounts";
import {getOperatorXrplAddresses } from "./utils/smart-accounts";
async function main() {
    //const xrplWallet = Wallet.fromSeed(seed);
    const xrplAddress = "rBMHdVaKfG1o6PSYKsKP1FPRhsUdBVBzX6";
    console.log("XRPL address:", xrplAddress);

    const personalAccount = await getPersonalAccountAddress(xrplAddress);
    console.log("Flare personal account address:", personalAccount);

    const operatorXrplAddresses = await getOperatorXrplAddresses();
    console.log("Operator XRPL addresses:", operatorXrplAddresses);

}

void main().catch((err) => {
    console.error(err);
    process.exit(1);
});
