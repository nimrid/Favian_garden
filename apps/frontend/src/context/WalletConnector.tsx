// src/WalletConnector.tsx
import React, { useState } from 'react';
import { connectWallet } from './walletConnection';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Wallet</button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
    </div>
  );
};

export default WalletConnector;
