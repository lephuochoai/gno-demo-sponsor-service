'use client';

import React, { useState, type PropsWithChildren } from 'react';
import { Box } from '@/app/(landing)/components/Box';
import { Container } from '@/app/(landing)/components/Container';
import { AppContextProvider } from '@/context/app.context';
import { Button } from '@nextui-org/button';
import { Skeleton, Tooltip } from '@nextui-org/react';
import Marquee from 'react-fast-marquee';

import { shortenString } from '@/lib/common';
import { useAccount } from '@/hooks/wallet/useAccount';
import { useConnected } from '@/hooks/wallet/useConnected';
import { useDisconnect } from '@/hooks/wallet/useDisconnect';
import Footer from '@/components/footer';

const Layout = ({ children }: PropsWithChildren) => {
  const [active, setActive] = useState<string | undefined>(undefined);
  return (
    <AppContextProvider value={{ activeNav: active, setActiveNav: setActive }}>
      <div className="relative flex flex-col">
        {/* <Navbar /> */}

        <main className="bg-background mx-auto min-h-screen w-full grow text-clip">
          <Container>
            <Marquee className="rounded-md bg-gray-500 py-4 text-white shadow-md">
              <p className="text-lg font-bold">VARMETA - DEMO SPONSOR SERVICE</p>
            </Marquee>

            <Box>
              <Heading />

              <div className="p-8">{children}</div>
            </Box>
          </Container>
        </main>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default Layout;

const Heading = () => {
  const { data: account, isLoading } = useAccount();
  const { data: isConnected } = useConnected();
  const { mutate: disconnect, isPending: disconnecting } = useDisconnect();

  if (isLoading) return <SkeletonHeadingLoading />;

  if (isConnected)
    return (
      <div className="flex items-center p-4 shadow-md">
        <div className="flex-1" />

        <Tooltip content={account?.address} showArrow>
          <p className="text-center font-bold">{shortenString(account?.address ?? '', 4)}</p>
        </Tooltip>

        <div className="flex flex-1 justify-end">
          <Button onClick={() => disconnect()} isLoading={disconnecting}>
            Disconnect
          </Button>
        </div>
      </div>
    );

  return null;
};

const SkeletonHeadingLoading = () => {
  return (
    <div className="flex justify-center p-4 shadow-md">
      <div className="flex-1" />

      <Skeleton className="rounded-lg">
        <div className="bg-secondary h-10 w-40"></div>
      </Skeleton>

      <div className="flex-1" />
    </div>
  );
};
