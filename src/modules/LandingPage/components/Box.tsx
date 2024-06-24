import * as React from 'react';

import { cn } from '@/lib/utils';

export const Box = ({ children, className }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={cn('mx-auto max-w-5xl overflow-hidden rounded-sm border bg-white', className)}>{children}</div>
  );
};
