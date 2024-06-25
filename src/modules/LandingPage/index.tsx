'use client';

import * as React from 'react';
import { useWalletContext } from '@/context/wallet.context';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

import { useConnect } from '@/hooks/wallet/useConnect';
import { heading } from '@/components/primitives';

import { AccountInfo } from './AccountInfo';
import { Activity } from './Activity';

export const LandingPageModule = () => {
  const { isConnected } = useWalletContext();

  const { mutate: connect, isPending } = useConnect();

  if (!isConnected)
    return (
      <div className="flex min-h-[20rem] flex-col items-center justify-center gap-4">
        <h1 className={heading()}>Welcome to SPONSOR SERVICE</h1>
        <Button color="primary" size="lg" onClick={() => connect()} isLoading={isPending} disabled={isPending}>
          Connect Adena Wallet
        </Button>
      </div>
    );

  return (
    <div>
      <AccountInfo />

      <Divider />

      <Activity />
    </div>
  );
};
