import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args));
};

export const formatDateFromMs = (ms: number) => {
  return new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: 'short',
    timeStyle: "short",
    timeZone: 'UTC'
  }).format(ms)
}
