import { useWalletContext } from '@/context/wallet.context';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { textToBalances } from '@/lib/common';
import { QUERY_KEY } from '@/lib/query-key';

export const useBalance = (props?: UseQueryOptions<any, Error>) => {
  const { walletAccount, isConnected } = useWalletContext();
  const query = useQuery({
    queryKey: [QUERY_KEY.useBalance, isConnected, walletAccount],
    queryFn: () => textToBalances(walletAccount?.coins ?? '') ?? null,
    ...props,
  });

  return query;
};
