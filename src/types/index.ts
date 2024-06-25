import { type SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

declare global {
  interface Window {
    adena: any;
  }
}
