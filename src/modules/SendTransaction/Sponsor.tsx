import * as React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

type Props = {};
export const Sponsor = (props: Props) => {
  return (
    <div className="space-y-2 p-4">
      <p className="font-medium">Sponsor:</p>

      <Select items={[]} label="Sponsor address" placeholder="Select a sponsor address" className="w-full">
        {(address) => <SelectItem key={address}>{address}</SelectItem>}
      </Select>
    </div>
  );
};
