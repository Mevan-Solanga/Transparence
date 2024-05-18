import { keyStores } from "near-api-js";

// Check if we are running in a browser environment
const isBrowser = typeof window !== "undefined";

const keyStore = isBrowser
  ? new keyStores.BrowserLocalStorageKeyStore()
  : new keyStores.InMemoryKeyStore();

const nearConfig = {
  networkId: "testnet", // or 'mainnet' for production
  keyStore, // Use the conditional key store
  nodeUrl: "https://rpc.testnet.near.org", // or 'https://rpc.mainnet.near.org'
  walletUrl: "https://wallet.testnet.near.org", // or 'https://wallet.mainnet.near.org'
  helperUrl: "https://helper.testnet.near.org", // or 'https://helper.mainnet.near.org'
  explorerUrl: "https://explorer.testnet.near.org", // or 'https://explorer.mainnet.near.org'
};

export default nearConfig;
