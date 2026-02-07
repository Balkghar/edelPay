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
    // Load KYC completion status from localStorage and set cookie
    const savedStatus = localStorage.getItem('kycCompleted') === 'true';
    setKycCompleted(savedStatus);
    // Set the cookie for middleware
    document.cookie = `kycCompleted=${savedStatus ? 'true' : 'false'}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setIsContextLoaded(true);
  }, []);

  useEffect(() => {
    // Save wallet address to cookie for middleware
    if (walletState.xrpAddress) {
      document.cookie = `wallet=${walletState.xrpAddress}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } else {
      document.cookie = `wallet=; path=/; max-age=0`;
    }
  }, [walletState.xrpAddress]);

  const handleSetKycCompleted = useCallback((completed: boolean) => {
    setKycCompleted(completed);
    localStorage.setItem('kycCompleted', completed ? 'true' : 'false');
    // Also set cookie for middleware
    document.cookie = `kycCompleted=${completed ? 'true' : 'false'}; path=/; max-age=${60 * 60 * 24 * 365}`;
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