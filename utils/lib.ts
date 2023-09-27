import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
