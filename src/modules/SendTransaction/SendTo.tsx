import * as React from 'react';
import { Input } from '@nextui-org/input';

type Props = {};
export const SendTo = (props: Props) => {
  return (
    <div className="space-y-4 p-4">
      <p className="font-medium">Send To:</p>

      <Input className="placeholder-gray-500::placeholder" placeholder="Enter the wallet address" />
    </div>
  );
};
