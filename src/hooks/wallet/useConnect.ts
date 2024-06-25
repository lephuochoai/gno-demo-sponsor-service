import { useWalletContext } from '@/context/wallet.context';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Props = {};
export const useConnect = (props?: UseMutationOptions<Props>) => {
  const { connect } = useWalletContext();

  return useMutation<any, Error>({
    mutationFn: async () => {
      connect();
    },
    ...props,
  });
};
