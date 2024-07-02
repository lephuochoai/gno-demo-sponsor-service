import * as React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

import { shortenString } from '@/lib/common';
import { type TSponsor } from '@/hooks/wallet/useGetListSponsors';

type Props = {
  data: TSponsor[];
  value?: string;
  isFetching?: boolean;
  onChange: (value: string) => void;
};
export const Sponsor = ({ data = [], onChange, value, isFetching = false }: Props) => {
  console.log({ data });

  return (
    <Select
      items={data}
      label="Sponsor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Select a sponsor service"
      className="w-full"
      isLoading={isFetching}
    >
      {(item) => (
        <SelectItem key={item.address} textValue={item.name}>
          <div className="flex items-center gap-4">
            <p className="text-medium">{item.name}</p>
            <p className="text-xs italic text-gray-500">({shortenString(item.address)})</p>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
