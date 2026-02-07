import { useWallet as useWalletHook } from '@/hooks/useWallet';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

type WalletContextType = {
  xrpAddress: string;
  isLoading: boolean;
  error: string;
  xummQrCode: string;
  xummJumpLink: string;
  connectXUMM: () => void;
  connectGEM: () => void;
  connectCrossmark: () => void;
  disconnect: () => void;
  isRetrieved: boolean;
  kycCompleted: boolean;
  setKycCompleted: (completed: boolean) => void;
  isContextLoaded: boolean;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const walletState = useWalletHook(true); // Enable JWT for persistence
  const [kycCompleted, setKycCompleted] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);

  useEffect(() => {
    // Load KYC completion status from localStorage
    const savedStatus = localStorage.getItem('kycCompleted') === 'true';
    setKycCompleted(savedStatus);
    setIsContextLoaded(true);
  }, []);

  const handleSetKycCompleted = useCallback((completed: boolean) => {
    setKycCompleted(completed);
    localStorage.setItem('kycCompleted', completed ? 'true' : 'false');
  }, []);

  return (
    <WalletContext.Provider value={{ ...walletState, error: walletState.error || '', kycCompleted, setKycCompleted: handleSetKycCompleted, isContextLoaded }}>
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