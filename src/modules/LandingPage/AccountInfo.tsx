import * as React from 'react';

import { Actions } from './Actions';
import { Balance } from './Balance';

export const AccountInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pb-8">
      <Balance />

      <Actions />
    </div>
  );
};
