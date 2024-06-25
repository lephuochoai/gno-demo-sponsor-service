import { useWalletContext } from '@/context/wallet.context';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Props = {};
export const useDisconnect = (props?: UseMutationOptions<Props>) => {
  const { disconnectWallet } = useWalletContext();

  return useMutation<any, Error>({
    mutationFn: async () => {
      disconnectWallet();
    },
    ...props,
  });
};
