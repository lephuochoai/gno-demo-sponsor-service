import { useWalletContext } from '@/context/wallet.context';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/query-key';

export const useAccount = (props?: UseQueryOptions<any, Error>) => {
  const { walletAccount, isConnected } = useWalletContext();
  const query = useQuery({
    queryKey: [QUERY_KEY, isConnected],
    queryFn: () => walletAccount ?? null,
    ...props,
  });

  return query;
};
