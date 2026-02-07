import { useState, useEffect, useCallback } from 'react';
import { publicClient } from '@/lib/flare';
import { HelloWorldABI } from '@/lib/contracts/HelloWorldABI';

const CONTRACT_ADDRESS = '0xAfaBccf62bba1629e9aCF56D7DBA0a129Eb19240' as `0x${string}`;

interface PollingState {
  isPolling: boolean;
  currentMessage: string | null;
  pollCount: number;
  lastPollTime: Date | null;
  error: string | null;
}

export const useContractPolling = () => {
  const [state, setState] = useState<PollingState>({
    isPolling: false,
    currentMessage: null,
    pollCount: 0,
    lastPollTime: null,
    error: null,
  });

  const readMessage = useCallback(async (): Promise<string | null> => {
    try {
      console.log('🔍 Polling contract for message update...');
      
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: HelloWorldABI,
        functionName: 'message',
      }) as string;

      console.log(`📖 Contract message read: "${result}"`);
      return result;
    } catch (error) {
      console.error('❌ Failed to read contract message:', error);
      return null;
    }
  }, []);

  const startPolling = useCallback((expectedMessage: string, maxAttempts: number = 60) => {
    console.log(`🚀 Starting polling for message: "${expectedMessage}" (max ${maxAttempts} attempts)`);
    
    setState(prev => ({
      ...prev,
      isPolling: true,
      pollCount: 0,
      error: null,
    }));

    let attempts = 0;
    const pollInterval = setInterval(async () => {
      attempts++;
      const now = new Date();
      
      console.log(`📊 Poll attempt ${attempts}/${maxAttempts} at ${now.toLocaleTimeString()}`);
      
      setState(prev => ({
        ...prev,
        pollCount: attempts,
        lastPollTime: now,
      }));

      try {
        const currentMessage = await readMessage();
        
        setState(prev => ({
          ...prev,
          currentMessage,
        }));

        if (currentMessage === expectedMessage) {
          console.log('🎉 SUCCESS! Message updated successfully!');
          clearInterval(pollInterval);
          setState(prev => ({
            ...prev,
            isPolling: false,
          }));
          return;
        }

        if (attempts >= maxAttempts) {
          console.log('⏰ Polling timeout reached');
          clearInterval(pollInterval);
          setState(prev => ({
            ...prev,
            isPolling: false,
            error: `Timeout: Message not updated after ${maxAttempts} attempts (${maxAttempts * 5} seconds)`,
          }));
          return;
        }

        console.log(`⏳ Message not updated yet, retrying in 5s... (${attempts}/${maxAttempts})`);
      } catch (error) {
        console.error(`❌ Poll attempt ${attempts} failed:`, error);
        
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setState(prev => ({
            ...prev,
            isPolling: false,
            error: `Polling failed after ${maxAttempts} attempts: ${error}`,
          }));
        }
      }
    }, 5000); // Poll every 5 seconds

    return () => {
      console.log('🛑 Stopping polling');
      clearInterval(pollInterval);
      setState(prev => ({
        ...prev,
        isPolling: false,
      }));
    };
  }, [readMessage]);

  const stopPolling = useCallback(() => {
    console.log('🛑 Manual polling stop requested');
    setState(prev => ({
      ...prev,
      isPolling: false,
    }));
  }, []);

  const getInitialMessage = useCallback(async () => {
    console.log('📖 Reading initial contract message...');
    const message = await readMessage();
    setState(prev => ({
      ...prev,
      currentMessage: message,
    }));
    return message;
  }, [readMessage]);

  return {
    ...state,
    startPolling,
    stopPolling,
    getInitialMessage,
    readMessage,
  };
};