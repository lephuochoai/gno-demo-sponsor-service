import { createSafeContext } from '@/lib/create-safe-context';

type Address = string;

export type SendTractionValue = {
  toAddress: Address;
  toAmount: string;
  sponsorAddress: Address;
};

type SendTransactionContextProps = {
  sendTransactionValue?: SendTractionValue;
  onSendTransaction: (value: Partial<SendTractionValue>) => void;
};

export const [SendTransactionContextProvider, useSendTransactionContext] =
  createSafeContext<SendTransactionContextProps>('SendTransactionContextProvider component was not found in tree');
