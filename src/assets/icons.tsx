import { type ForwardRefExoticComponent, type RefAttributes, type SVGProps } from 'react';

import chevronRight from './svg/chevron-right.svg';
import gnot from './svg/gnot.svg';
import send from './svg/send.svg';
import telegram from './svg/telegram.svg';
import twitter from './svg/twitter.svg';

const IconList = {
  twitter,
  telegram,
  send,
  chevronRight,
  gnot,
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
