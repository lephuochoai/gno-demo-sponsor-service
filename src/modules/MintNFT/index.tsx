'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

import { ROUTES } from '@/lib/routes';
import { useAccount } from '@/hooks/wallet/useAccount';
import { useGetListSponsors } from '@/hooks/wallet/useGetListSponsors';
import { useSignAmino } from '@/hooks/wallet/useSignAmino';

import { Sponsor } from './Sponsor';

export const MintNFTModule = () => {
  const router = useRouter();
  // const [tokenId, setTokenId] = React.useState('');
  const [sponsor, setSponsor] = React.useState<string | undefined>();
  const { data: account } = useAccount();
  const { mutate: signMessage, isPending: isPendingSign } = useSignAmino({
    onSuccess(response) {
      console.log(response);
      toast.success('Mint NFT successfully');
      router.push(ROUTES.DASHBOARD);
    },
    onError(error) {
      console.error(error);
      toast.error('Mint fail');
    },
  });

  const { data: sponsors, isFetching: isFetchingSponsors } = useGetListSponsors();

  const handleMint = () => {
    if (!account?.address) return;

    signMessage([
      {
        type: '/vm.m_noop',
        value: {
          caller: sponsor,
        },
      },
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

      <Sponsor
        isFetching={isFetchingSponsors}
        data={sponsors ?? []}
        value={sponsor}
        onChange={(value) => setSponsor(value)}
      />

      <div className="flex justify-center gap-4">
        <Button color="default" size="lg" className="w-full flex-1 px-0">
          <Link href={ROUTES.DASHBOARD} className="flex h-full w-full items-center justify-center">
            Cancel
          </Link>
        </Button>

        <div className="flex-1">
          <Button
            color="primary"
            className="w-full"
            size="lg"
            onClick={handleMint}
            isLoading={isPendingSign}
            disabled={!sponsor}
          >
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
