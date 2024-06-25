import { useWalletContext } from '@/context/wallet.context';
import { useQuery } from '@tanstack/react-query';

export const useConnected = () => {
  const { isConnected } = useWalletContext();

  return useQuery({
    queryKey: ['useConnected', isConnected],
    queryFn: () => isConnected,
  });
};
