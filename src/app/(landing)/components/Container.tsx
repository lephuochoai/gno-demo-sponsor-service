import * as React from 'react';

import { cn } from '@/lib/utils';

export const Container = ({ children, className }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return <div className={cn('container mx-auto p-8', className)}>{children}</div>;
};
