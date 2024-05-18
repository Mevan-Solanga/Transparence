import nearAPI from 'near-api-js';

// Initialize an in-memory key store
const myKeyStore = new nearAPI.keyStores.InMemoryKeyStore();

// Example usage:
async function initNEAR() {
    const nearConfig = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
    };

    try {
        const near = await nearAPI.connect({
            deps: {
                keyStore: myKeyStore,
            },
            ...nearConfig,
        });
        const nearConnection = await nearAPI.connect({
            deps: {
                keyStore: myKeyStore,
            },
            ...nearConfig,
        });
        console.log('Connected to NEAR');

        // Define a unique appKeyPrefix
        const appKeyPrefix = 'your_app_name_prefix_';

        const wallet = new nearAPI.WalletConnection(near, appKeyPrefix);
        
        console.log('Wallet connection established');

        // Retrieve account ID
        const walletAccountId = wallet.getAccountId(); 
        console.log('Wallet Account ID:', walletAccountId); 

        if (wallet.isSignedIn()) {
          console.log("User is signed in");
        } else {
          console.log("User is not signed in");
        }
        // gets account details in terms of authorized apps and transactions
const account = await nearConnection.account("example-account.testnet");
const accid = await account.state();

console.log('Wallet sdfvd ID:', accid); 

        return { near, wallet };
    } catch (error) {
        console.error('Error connecting to NEAR:', error);
        throw error;
    }
}

// Example usage:
async function example() {
    try {
        console.log('Initializing NEAR...');
        const { near, wallet } = await initNEAR();
        console.log('NEAR initialization successful');
        // Use near and wallet objects here...
    } catch (error) {
        console.error('Error initializing NEAR:', error);
        // Handle initialization error
    }
}

example(); // Call the example function
