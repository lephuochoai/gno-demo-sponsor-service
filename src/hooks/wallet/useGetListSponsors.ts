// @flow
import { useWalletContext } from '@/context/wallet.context';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/query-key';
import { makeABCIParams } from '@/lib/utils';

import { useAccount } from './useAccount';

type Props = {};
export const useGetListSponsors = (props?: Props) => {
  const { isConnected, clientProvider } = useWalletContext();
  const { data: account } = useAccount();

  return useQuery<TSponsor[], Error>({
    queryKey: [QUERY_KEY.useGetListSponsors, isConnected, clientProvider, account],
    queryFn: async () => {
      const result = await clientProvider?.evaluateExpression(
        'gno.land/r/varmeta/sponsors',
        makeABCIParams('GetList', [])
      );
      console.log({ result });

      return parseListSponsors(result ?? '');
    },
    refetchOnMount: true,
    ...props,
  });
};

const parseListSponsors = (sponsors: string) => {
  const parseList = (sponsors.match(/\("(.*?)" string\)/g) ?? []).map((pair) => {
    let [, pairValue] = pair.match(/\("(.*)" string\)/) ?? [];
    return pairValue;
  });

  let result = [];

  for (let i = 0; i < parseList.length - 1; i = i + 2) {
    result.push({
      name: parseList[i],
      address: parseList[i + 1],
    });
  }

  return result;
};

export type TSponsor = {
  name: string;
  address: string;
};
