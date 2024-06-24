import * as React from 'react';
import { Icons } from '@/assets/icons';
import { Button } from '@nextui-org/button';

type Props = {};
export const AccountInfo = (props: Props) => {
  return (
    <div className="space-y-8 pb-8">
      <Heading />

      <Balance />

      <Actions />
    </div>
  );
};

const Heading = () => {
  return (
    <div className="p-4 shadow-md">
      <p className="text-center">Account Name</p>
      <p className="text-center">Account Address</p>
    </div>
  );
};

const Balance = () => {
  return (
    <div>
      <p className="text-center text-2xl font-semibold">1234.55 SS</p>
      <p className="text-md text-center">34.55 USD</p>
    </div>
  );
};

const Actions = () => {
  return (
    <div className="flex justify-center gap-8">
      <Action title="Send" />
    </div>
  );
};

type ActionProps = {
  title: string;
};
const Action = ({ title }: ActionProps) => {
  return (
    <div>
      <Button color="primary" isIconOnly>
        <Icons.send color="#fff" width={24} height={24} />
      </Button>
      <p>{title}</p>
    </div>
  );
};
