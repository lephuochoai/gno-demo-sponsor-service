import * as React from 'react';
import { Input } from '@nextui-org/input';

type Props = {};
export const Asset = (props: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center p-4">
        <p className="w-full max-w-[8rem] font-medium">Asset:</p>

        <div>
          <p>SS</p>
          <p>Balance: 11230123 SS</p>
        </div>
      </div>

      <div className="flex items-center p-4">
        <p className="w-full max-w-[8rem] font-medium">Amount:</p>

        <Input className="placeholder-gray-500::placeholder" placeholder="Enter the wallet address" />
      </div>
    </div>
  );
};
