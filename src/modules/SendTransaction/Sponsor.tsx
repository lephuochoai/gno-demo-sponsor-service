import * as React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

type Props = {};
export const Sponsor = (props: Props) => {
  return (
    <Select items={[]} label="Sponsor" placeholder="Select a sponsor address" className="w-full">
      {(address) => <SelectItem key={address}>{address}</SelectItem>}
    </Select>
  );
};
