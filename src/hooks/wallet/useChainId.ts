import { useWalletContext } from '@/context/wallet.context';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/query-key';

export const useChainId = () => {
  const { chain } = useWalletContext();

  return useQuery({
    queryKey: [QUERY_KEY.useChainId, chain],
    queryFn: () => chain.chainId,
  });
};
