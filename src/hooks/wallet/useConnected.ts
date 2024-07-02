import { useWalletContext } from '@/context/wallet.context';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/query-key';

export const useConnected = () => {
  const { isConnected } = useWalletContext();

  return useQuery({
    queryKey: [QUERY_KEY.useConnected, isConnected],
    queryFn: () => isConnected,
  });
};
