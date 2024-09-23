import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Set up connection to Solana network (you can switch to devnet/testnet as needed)
const connection = new Connection('https://api.mainnet-beta.solana.com'); 

// Replace with a valid seller's wallet address
const sellerWalletAddress = "3GghhszLrqQFEcStJqXFE2oNSohHG2QLFdknZoAjq7bp";

// Validate and create a PublicKey object for the seller
let sellerPublicKey: PublicKey;
try {
    sellerPublicKey = new PublicKey(sellerWalletAddress);
} catch (error) {
    throw new Error(`Invalid seller wallet address: ${sellerWalletAddress}`);
}

// Function to handle the image purchase
export async function handleBuyImage(
  priceInSol: number,
  wallet: WalletContextState  // Wallet information is passed as an argument
) {
  const { publicKey, signTransaction } = wallet;

  // Ensure the wallet is connected and the signTransaction function is available
  if (!publicKey || !signTransaction) {
    throw new Error("Wallet is not connected or unable to sign transactions.");
  }

  // Create the transaction to transfer SOL from buyer to seller
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: sellerPublicKey,
      lamports: priceInSol * 1e9, // Convert SOL to lamports (1 SOL = 1e9 lamports)
    })
  );

  try {
    // Fetch recent blockhash to include in the transaction
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    // Sign the transaction with the wallet
    const signedTransaction = await signTransaction(transaction);

    // Send the raw signed transaction to the Solana network
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    // Wait for the transaction to be confirmed
    await connection.confirmTransaction(signature);

    console.log('Transaction successful:', signature);
    return signature;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error("Transaction failed.");
  }
}
