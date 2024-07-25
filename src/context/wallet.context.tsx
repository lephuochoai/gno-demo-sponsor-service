'use client';

import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { GnoJSONRPCProvider, type GnoProvider } from '@gnolang/gno-js-client';
import { v4 as uuidv4 } from 'uuid';

import { createSafeContext } from '@/lib/create-safe-context';

const CHAIN_ID = 'local';

//consider to change this chain url
const currentChain = {
  name: 'Local',
  chainId: 'dev',
  rpcUrl: 'https://chain.virtualx.vn',
  // rpcUrl: 'http://127.0.0.1:26657',
  // 'http://127.0.0.1:26657',
  wsUrl: 'ws://127.0.0.1:26657/websocket',
} as const;

type WalletContextProps = {
  walletAccount: any;
  isConnected: boolean;
  chain: typeof currentChain;
  clientProvider: GnoProvider | undefined;
  connect: () => void;
  disconnectWallet: () => void;
  setWalletAccount: (account: any) => void;
  doContract: (messages: SignAndSendTrans[]) => void;
  signAmino: (messages: SignAndSendTrans[]) => void;
};

export const [WalletContextProvider, useWalletContext] = createSafeContext<WalletContextProps>(
  'WalletContextProvider component was not found in tree'
);

const SPONSOR_SESSION_KEY = 'SPONSOR_SESSION';

export const WalletContextProviderWrapper = ({ children }: PropsWithChildren) => {
  const [walletAccount, setWalletAccount] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [clientProvider, setClientProvider] = useState<GnoProvider>();
  const [sessionId, setSessionId] = useState('');
  const [chain] = useState(currentChain);

  const isConnected = useMemo(() => {
    return !!walletAccount && walletAccount?.address?.length > 0;
  }, [walletAccount]);

  const disconnectWallet = useCallback(() => {
    setWalletAccount(undefined);
    setSessionId('');
    setClientProvider(undefined);
    sessionStorage.removeItem(SPONSOR_SESSION_KEY);
  }, []);

  const switchNetwork = async (chainId: string) => {
    return await window.adena.SwitchNetwork(chainId);
  };

  const connectAdenaClient = useCallback(async () => {
    if (!window.adena) {
      //open adena.app in a new tab if the adena object is not found
      window.open('https://adena.app/', '_blank');
    } else {
      await window.adena.AddEstablish('Sponsor Service');
      const account = await window.adena.GetAccount();
      const network = account.data.chainId === CHAIN_ID;
      if (!network) {
        await switchNetwork(CHAIN_ID);
      }
      setWalletAccount(account?.data);
      setProvider(window.adena);
      setClientProvider(new GnoJSONRPCProvider(currentChain.rpcUrl));
    }
  }, []);

  const doContract = async (messages: SignAndSendTrans[]) => {
    if (!provider) return;

    const result = await provider.DoContract({
      messages: messages,
      gasFee: 1,
      gasWanted: 10000000,
    });

    if (result?.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  };

  const signTx = async (messages: SignAndSendTrans[]) => {
    if (!provider) return;
    const result = await provider.SignTx({
      messages: messages,
      gasFee: 1,
      gasWanted: 10000000,
    });

    if (result?.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  };

  /**
   * Get current session id
   */
  useEffect(() => {
    setSessionId(sessionStorage.getItem(SPONSOR_SESSION_KEY) ?? '');
  }, []);

  /**
   * Set current session id
   */
  useEffect(() => {
    if (sessionId || !walletAccount) return;
    const id = uuidv4();
    setSessionId(id);
    sessionStorage.setItem(SPONSOR_SESSION_KEY, id);
  }, [walletAccount, sessionId]);

  /**
   * Reconnect to adena
   */
  useEffect(() => {
    if (!sessionId) return;
    connectAdenaClient();
  }, [connectAdenaClient, sessionId]);

  /**
   * Detect event
   */
  useEffect(() => {
    if (!provider) return;
    provider.On('changedAccount', () => connectAdenaClient());
    provider.On('changedNetwork', () => connectAdenaClient());
  }, [connectAdenaClient, provider]);

  return (
    <WalletContextProvider
      value={{
        walletAccount,
        isConnected,
        clientProvider,
        chain,
        connect: connectAdenaClient,
        setWalletAccount,
        disconnectWallet,
        doContract,
        signAmino: signTx,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export type SignAndSendTrans = {
  type: '/bank.MsgSend' | '/vm.m_call' | '/vm.m_addpkg' | '/vm.m_run' | '/vm.m_noop';
  value: any;
};
