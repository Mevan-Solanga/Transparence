import { connect, WalletConnection, Contract } from "near-api-js";
import nearConfig from "./near-config.js"; // Ensure the path is correct and uses .js extension

export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(nearConfig);

  // Initialize wallet connection
  const walletConnection = new WalletConnection(near);

  // Load the contract
  const contract = new Contract(
    walletConnection.account(),
    "your-contract-name.testnet",
    {
      // View methods are read-only – they don't change the state but usually return some value
      viewMethods: ["getVerificationToken"],
      // Change methods can modify the state – they don't return a value directly but the transaction result
      changeMethods: ["publishVerificationToken"],
    }
  );

  console.log("This is the wallet connections", walletConnection);
  return { walletConnection, contract };
}
