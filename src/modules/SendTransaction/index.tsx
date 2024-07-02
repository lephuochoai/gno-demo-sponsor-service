'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSendTransactionContext } from '@/context/sendTransaction.context';
import { Button } from '@nextui-org/button';

import { ROUTES } from '@/lib/routes';
import { addressValidate } from '@/lib/utils';

import { Asset } from './Asset';
import { SendTo } from './SendTo';

export const SendTransactionModule = () => {
  const { sendTransactionValue } = useSendTransactionContext();
  const validateAmount = (value: string) => /^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?|\d*\.\d*[1-9]\d*)$/.test(value);

  const isValidAddress = addressValidate(sendTransactionValue?.toAddress ?? '');
  const isValidAmount = React.useMemo(() => {
    if (!sendTransactionValue?.toAmount) return false;
    return validateAmount((sendTransactionValue?.toAmount ?? '').toString());
  }, [sendTransactionValue?.toAmount]);

  return (
    <Box>
      <p className="text-center font-semibold">Send transaction</p>

      <SendTo />

      {isValidAddress && (
        <>
          {/* <Sponsor /> */}

          <Asset isValidAmount={isValidAmount} />
        </>
      )}

      <div className="flex justify-center gap-4">
        <Button color="default" size="lg" className="w-full flex-1 px-0">
          <Link href={ROUTES.DASHBOARD} className="flex h-full w-full items-center justify-center">
            Cancel
          </Link>
        </Button>

        {isValidAddress && (
          <div className="flex-1">
            <Button
              disabled={!isValidAddress || !isValidAmount || !sendTransactionValue?.sponsorAddress}
              color="primary"
              className="w-full"
              size="lg"
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
};

const Box = ({ children }: React.PropsWithChildren) => {
  return <div className="mx-auto min-h-[20rem] max-w-lg space-y-4 rounded-sm border p-4 shadow-sm">{children}</div>;
};
