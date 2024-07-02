import { useWalletContext } from '@/context/wallet.context';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { textToBalances } from '@/lib/common';
import { QUERY_KEY } from '@/lib/query-key';

import { useAccount } from './useAccount';

export const useBalance = (props?: UseQueryOptions<any, Error>) => {
  const { isConnected } = useWalletContext();
  const { data: account } = useAccount();

  const query = useQuery({
    queryKey: [QUERY_KEY.useBalance, isConnected, account],
    queryFn: () => textToBalances(account?.coins ?? '') ?? null,
    ...props,
  });

  return query;
};
