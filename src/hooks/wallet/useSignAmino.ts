import { useWalletContext, type SignAndSendTrans } from '@/context/wallet.context';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Props = {};
export const useSignAmino = (props?: UseMutationOptions<Props, Error, SignAndSendTrans[]>) => {
  const { signAmino } = useWalletContext();

  return useMutation<any, Error, SignAndSendTrans[]>({
    mutationFn: async (messages) => {
      return await signAmino(messages);
    },
    ...props,
  });
};
