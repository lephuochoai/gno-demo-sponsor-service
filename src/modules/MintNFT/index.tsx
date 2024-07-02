'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

import { ROUTES } from '@/lib/routes';
import { useAccount } from '@/hooks/wallet/useAccount';
import { useDoContract } from '@/hooks/wallet/useDoContract';

export const MintNFTModule = () => {
  // const [tokenId, setTokenId] = React.useState('');
  const { data: account } = useAccount();
  const { mutate: onMint, isPending } = useDoContract({
    onSuccess() {
      toast.success('Mint NFT successfully');
    },
    onError(error) {
      console.error(error);
      toast.error('Mint fail');
    },
  });

  const handleMint = () => {
    if (!account?.address) return;

    onMint([
      {
        type: '/vm.m_call',
        value: {
          caller: account?.address, // your Adena address
          send: '',
          pkg_path: 'gno.land/r/varmeta/vmt721', // Gnoland package path
          func: 'Mint', // Function name
          args: [
            account?.address, // address,
            // tokenId,
          ],
        },
      },
    ]);
  };

  return (
    <Box>
      <p className="text-center font-semibold">Mint NFT</p>

      {/* <Input
        label="TokenId"
        placeholder="Enter token ID"
        pattern="^[0-9]$"
        className="text-4xl"
        size="lg"
        isClearable
        value={tokenId}
        // isInvalid={!isValidAmount}
        onChange={(e) => setTokenId(e.target.value)}
        onClear={() => setTokenId('')}
      /> */}

      <div className="flex justify-center gap-4">
        <Button color="default" size="lg" className="w-full flex-1 px-0">
          <Link href={ROUTES.DASHBOARD} className="flex h-full w-full items-center justify-center">
            Cancel
          </Link>
        </Button>

        <div className="flex-1">
          <Button color="primary" className="w-full" size="lg" onClick={handleMint} isLoading={isPending}>
            Mint
          </Button>
        </div>
      </div>
    </Box>
  );
};

const Box = ({ children }: React.PropsWithChildren) => {
  return <div className="mx-auto min-h-[20rem] max-w-lg space-y-4 rounded-sm border p-4 shadow-sm">{children}</div>;
};
