// src/walletConnection.ts
import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com'; // or testnet/devnet as needed

const connectWallet = async (): Promise<string | undefined> => {
  if (window.solana && (window.solana as any).isSolflare) {
    try {
      const response = await (window.solana as any).connect();
      console.log('Wallet connected:', response.publicKey.toString());
      return response.publicKey.toString();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  } else {
    alert('Solflare wallet not found. Please install it from https://solflare.com');
  }
};

const getConnection = (): Connection => {
  return new Connection(SOLANA_RPC_URL);
};

export { connectWallet, getConnection };
