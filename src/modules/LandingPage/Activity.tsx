'use client';

import * as React from 'react';
import { Skeleton } from '@nextui-org/react';

import { useNftBalance } from '@/hooks/wallet/useNftBalance';

export const Activity = () => {
  const { data, isFetching } = useNftBalance();

  return (
    <div className="space-y-4 px-4 pt-4">
      <Heading isFetching={isFetching} total={data ?? '0'} />

      {/* <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8">
        {[1, 2, 4].map((tokenId) => (
          <div
            className="flex aspect-square items-center justify-center rounded-md border bg-gray-200 shadow-md"
            key={tokenId}
          >
            {tokenId}
          </div>
        ))}
      </div> */}

      {/* <div className="flex justify-center">
        <Pagination showControls total={10} initialPage={1} />
      </div> */}
    </div>
  );
};

const Heading = ({ isFetching, total = '0' }: { isFetching: boolean; total: string }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-left text-lg font-medium">Total NFT(s)</p>
      {isFetching ? (
        <Skeleton className="rounded-lg">
          <div className="bg-secondary h-6 w-10"></div>
        </Skeleton>
      ) : (
        <p className="font-medium">{total}</p>
      )}
    </div>
  );
};
