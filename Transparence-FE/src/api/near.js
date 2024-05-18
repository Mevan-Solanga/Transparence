import { connect, keyStores, WalletConnection } from 'near-api-js';

async function initNEAR() {
    const nearConfig = {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };
  
    const near = await connect({
      deps: {
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      },
      ...nearConfig,
    });
  
    const wallet = new WalletConnection(near);
  
    return { near, wallet };
}
  

  