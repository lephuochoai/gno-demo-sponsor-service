import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addressValidate = (address: string) => {
  if (address.length !== 40) return false;
  if (!address.startsWith('g1')) return false;
  if (address.slice(-6) === '000000') return false;

  return true;
};
