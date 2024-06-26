import { useWalletContext, type SignAndSendTrans } from '@/context/wallet.context';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Props = {};
export const useDoContract = (props?: UseMutationOptions<Props, Error, SignAndSendTrans[]>) => {
  const { doContract } = useWalletContext();

  return useMutation<any, Error, SignAndSendTrans[]>({
    mutationFn: async (messages) => {
      await doContract(messages);
    },
    ...props,
  });
};
