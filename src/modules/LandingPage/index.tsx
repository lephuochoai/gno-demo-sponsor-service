import * as React from 'react';
import { Divider } from '@nextui-org/divider';

import { AccountInfo } from './AccountInfo';
import { Activity } from './Activity';

type Props = {};
export const LandingPageModule = (props: Props) => {
  return (
    <div>
      <AccountInfo />

      <Divider />

      <Activity />
    </div>
  );
};
