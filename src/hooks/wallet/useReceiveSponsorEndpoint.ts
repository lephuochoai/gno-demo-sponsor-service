import { useWalletContext } from '@/context/wallet.context';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { makeABCIParams, parseABCIValue } from '@/lib/utils';

export const useReceiveSponsorEndpoint = (props?: UseMutationOptions<any, Error, string>) => {
  const { clientProvider } = useWalletContext();

  return useMutation<any, Error, string>({
    mutationFn: async (sponsorName: string) => {
      const result = await clientProvider?.evaluateExpression(
        'gno.land/r/varmeta/sponsors',
        makeABCIParams('GetURLByName', [sponsorName])
      );

      return parseABCIValue(result ?? '').replace(/"/g, '');
    },
    ...props,
  });
};
