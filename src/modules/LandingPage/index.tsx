import * as React from 'react';
import { Divider } from '@nextui-org/divider';

import { AccountInfo } from './AccountInfo';
import { Activity } from './Activity';
import { Container } from './components/Container';

type Props = {};
export const LandingPageModule = (props: Props) => {
  return (
    <Container>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-sm border bg-white">
        <AccountInfo />

        <Divider />

        <Activity />
      </div>
    </Container>
  );
};
