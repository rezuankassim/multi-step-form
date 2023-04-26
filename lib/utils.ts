import {ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const monthlyOrYearly = (val: 'monthly' | 'yearly', monthly: any, yearly: any) => {
  if (val === 'monthly') return monthly;

  if (val === 'yearly') return yearly;
};
