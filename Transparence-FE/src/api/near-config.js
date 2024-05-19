import { connect, keyStores, WalletConnection } from 'near-api-js';

const nearConfig = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
};

export default nearConfig;

export async function initContract() {
  const near = await connect(nearConfig);
  const walletConnection = new WalletConnection(near);
  
  const accountId = walletConnection.getAccountId();
  
  const contract = new near.Contract(walletConnection.account(), 'my-new-account.samudraperera.testnet', {
    viewMethods: ['getVerificationStatus'],
    changeMethods: ['createVerificationRequest', 'confirmVerificationRequest'],
  });

  return { walletConnection, contract, accountId };
}
