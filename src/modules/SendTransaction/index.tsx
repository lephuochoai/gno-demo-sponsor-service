'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSendTransactionContext } from '@/context/sendTransaction.context';
import { Button } from '@nextui-org/button';

import { ROUTES } from '@/lib/routes';

import { Asset } from './Asset';
import { SendTo } from './SendTo';
import { Sponsor } from './Sponsor';

export const SendTransactionModule = () => {
  const { sendTransactionValue } = useSendTransactionContext();

  const isVerifyAddress = !sendTransactionValue?.toAddress;

  return (
    <Box>
      <p className="text-center font-semibold">Send transaction</p>

      <SendTo />

      <Sponsor />

      <Asset />

      <div className="flex justify-center gap-4">
        <Link href={ROUTES.DASHBOARD}>
          <Button color="default">Cancel</Button>
        </Link>

        <Button color="primary">Send</Button>
      </div>
    </Box>
  );
};

const Box = ({ children }: React.PropsWithChildren) => {
  return <div className="mx-auto min-h-[30rem] max-w-lg rounded-sm border py-4 shadow-sm">{children}</div>;
};
