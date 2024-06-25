import * as React from 'react';
import Link from 'next/link';
import { Icons } from '@/assets/icons';
import { Button } from '@nextui-org/button';

import { ROUTES } from '@/lib/routes';

type Props = {};
export const AccountInfo = (props: Props) => {
  return (
    <div className="space-y-8 pb-8">
      <Balance />

      <Actions />
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
      <Action title="Send" url={ROUTES.SEND} />
    </div>
  );
};

type ActionProps = {
  title: string;
  url: string;
};
const Action = ({ title, url }: ActionProps) => {
  return (
    <Link href={url}>
      <>
        <Button color="primary" isIconOnly>
          <Icons.send color="#fff" width={24} height={24} />
        </Button>
        <p>{title}</p>
      </>
    </Link>
  );
};
