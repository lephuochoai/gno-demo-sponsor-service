import * as React from 'react';
import { Icons } from '@/assets/icons';
import { useSendTransactionContext } from '@/context/sendTransaction.context';
import { Input } from '@nextui-org/input';

type Props = {
  isValidAmount: boolean;
};
export const Asset = ({ isValidAmount }: Props) => {
  const { sendTransactionValue, onSendTransaction } = useSendTransactionContext();

  const handleChangeAmount = (amount: string) => {
    onSendTransaction({ toAmount: amount });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <p className="text-medium w-full max-w-[8rem] font-medium">Asset:</p>

        <TokenBalance />
      </div>

      <Input
        pattern="^[0-9]*[.,]?[0-9]*$"
        className="text-4xl"
        placeholder="0.00"
        size="lg"
        isClearable
        label="Amount"
        value={sendTransactionValue?.toAmount}
        isInvalid={!isValidAmount}
        onChange={(e) => handleChangeAmount(e.target.value)}
        onClear={() => handleChangeAmount('')}
      />
    </div>
  );
};

const TokenBalance = () => {
  return (
    <div className="flex items-center gap-2">
      <Icons.gnot size={30} />

      <div>
        <p className="font-medium">GNOT</p>
        <p className="text-xs">Balance: 11230123 GNOT</p>
      </div>
    </div>
  );
};
