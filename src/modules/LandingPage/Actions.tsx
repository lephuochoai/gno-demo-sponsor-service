import * as React from 'react';
import Link from 'next/link';
import { Icons } from '@/assets/icons';

import { ROUTES } from '@/lib/routes';

export const Actions = () => {
  return (
    <div className="flex justify-center gap-8">
      <Action title="Send" url={ROUTES.SEND} icon={<Icons.send color="#fff" width={24} height={24} />} />

      <Action title="Mint" url={ROUTES.MINT} icon={<Icons.image color="#fff" width={24} height={24} />} />
    </div>
  );
};

type ActionProps = {
  title: string;
  url: string;
  icon: React.ReactNode;
};
const Action = ({ title, url, icon }: ActionProps) => {
  return (
    <Link href={url}>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-primary hover:bg-primary-700 flex aspect-square w-14 items-center justify-center rounded-full shadow-sm transition-all">
          {icon}
        </div>

        <p className="font-medium">{title}</p>
      </div>
    </Link>
  );
};
