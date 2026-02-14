import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full bg-ralBlue/10 px-2.5 py-1 text-xs font-semibold text-ralBlue',
        className
      )}
      {...props}
    />
  );
}
