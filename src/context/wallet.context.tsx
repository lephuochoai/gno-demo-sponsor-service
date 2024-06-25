'use client';

import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createSafeContext } from '@/lib/create-safe-context';

type WalletContextProps = {
  walletAccount: any;
  isConnected: boolean;
  connect: () => void;
  disconnectWallet: () => void;
  setWalletAccount: (account: any) => void;
};

export const [WalletContextProvider, useWalletContext] = createSafeContext<WalletContextProps>(
  'WalletContextProvider component was not found in tree'
);

const SPONSOR_SESSION_KEY = 'SPONSOR_SESSION';

export const WalletContextProviderWrapper = ({ children }: PropsWithChildren) => {
  const [walletAccount, setWalletAccount] = useState<any>();
  const [sessionId, setSessionId] = useState('');

  const isConnected = useMemo(() => {
    return !!walletAccount && walletAccount?.address?.length > 0;
  }, [walletAccount]);

  const disconnectWallet = useCallback(() => {
    setWalletAccount(undefined);
    setSessionId('');
    sessionStorage.removeItem(SPONSOR_SESSION_KEY);
  }, []);

  const connectAdenaClient = useCallback(async () => {
    if (!window.adena) {
      //open adena.app in a new tab if the adena object is not found
      window.open('https://adena.app/', '_blank');
    } else {
      await window.adena.AddEstablish('Adena');
      const account = await window.adena.GetAccount();

      setWalletAccount(account?.data);
    }
  }, []);

  useEffect(() => {
    setSessionId(sessionStorage.getItem(SPONSOR_SESSION_KEY) ?? '');
  }, []);

  useEffect(() => {
    if (sessionId || !walletAccount) return;
    const id = uuidv4();
    setSessionId(id);
    sessionStorage.setItem(SPONSOR_SESSION_KEY, id);
  }, [walletAccount, sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    connectAdenaClient();
  }, [connectAdenaClient, sessionId]);

  return (
    <WalletContextProvider
      value={{ walletAccount, isConnected, connect: connectAdenaClient, setWalletAccount, disconnectWallet }}
    >
      {children}
    </WalletContextProvider>
  );
};
