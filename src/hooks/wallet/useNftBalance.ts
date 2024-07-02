import { useWalletContext } from '@/context/wallet.context';
import { useQuery, type QueryOptions } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/query-key';
import { makeABCIParams, parseABCIValue } from '@/lib/utils';

import { useAccount } from './useAccount';

export const useNftBalance = (props?: QueryOptions<any>) => {
  const { isConnected, clientProvider } = useWalletContext();
  const { data: account } = useAccount();

  return useQuery<any, Error>({
    queryKey: [QUERY_KEY.useNftBalance, isConnected, clientProvider, account],
    queryFn: async () => {
      const result = await clientProvider?.evaluateExpression(
        'gno.land/r/varmeta/vmt721',
        makeABCIParams('BalanceOf', [account?.address])
      );
      return parseABCIValue(result ?? '');
    },
    refetchOnMount: true,
    ...props,
  });
};
