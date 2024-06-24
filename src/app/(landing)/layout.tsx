'use client';

import React, { useState, type PropsWithChildren } from 'react';
import { AppContextProvider } from '@/context/app.context';
import { Box } from '@/modules/LandingPage/components/Box';
import { Container } from '@/modules/LandingPage/components/Container';

import Footer from '@/components/footer';

const Layout = ({ children }: PropsWithChildren) => {
  const [active, setActive] = useState<string | undefined>(undefined);
  return (
    <AppContextProvider value={{ activeNav: active, setActiveNav: setActive }}>
      <div className="relative flex flex-col">
        {/* <Navbar /> */}

        <main className="bg-background mx-auto min-h-screen w-full grow text-clip">
          <Container>
            <Box className="space-y-8">
              <Heading />

              <div className="pb-8">{children}</div>
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
  return (
    <div className="p-4 shadow-md">
      <p className="text-center">Account Name</p>
      <p className="text-center">Account Address</p>
    </div>
  );
};
