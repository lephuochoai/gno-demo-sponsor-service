import * as React from 'react';
import { useSendTransactionContext } from '@/context/sendTransaction.context';
import { Input } from '@nextui-org/input';

export const SendTo = () => {
  const { sendTransactionValue, onSendTransaction } = useSendTransactionContext();

  const handleChangeAddress = (address: string) => {
    onSendTransaction({ toAddress: address });
  };

  return (
    <Input
      type="email"
      label="Send To"
      placeholder="Enter the wallet address"
      value={sendTransactionValue?.toAddress}
      onChange={(e) => handleChangeAddress(e.target.value)}
      onClear={() => handleChangeAddress('')}
      isClearable
    />
  );
};
