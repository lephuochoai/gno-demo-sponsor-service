import * as React from 'react';
import { Skeleton } from '@nextui-org/react';

import { useBalance } from '@/hooks/wallet/useBalance';

export const Balance = () => {
  const { data: balances, isLoading } = useBalance();
  const formatBalance = balances?.[0].amount ? balances?.[0].amountFormatted : 0;

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="space-y-2 rounded-lg">
          <div className="bg-secondary h-8 w-40"></div>
        </Skeleton>
        <Skeleton className="space-y-2 rounded-lg">
          <div className="bg-secondary h-8 w-20"></div>
        </Skeleton>
      </div>
    );

  return (
    <div className="space-y-1">
      <p className="text-center text-2xl font-bold">{formatBalance}</p>
      <p className="text-center text-2xl font-bold">GNOT</p>
    </div>
  );
};
