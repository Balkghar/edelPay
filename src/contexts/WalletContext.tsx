import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet as useWalletHook } from '@/hooks/useWallet';

type WalletContextType = {
  xrpAddress: string;
  isLoading: boolean;
  error: string | null;
  xummQrCode: string;
  xummJumpLink: string;
  connectXUMM: () => void;
  connectGEM: () => void;
  connectCrossmark: () => void;
  disconnect: () => void;
  isRetrieved: boolean;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const walletState = useWalletHook(true); // Enable JWT for persistence

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}