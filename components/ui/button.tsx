import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx('rounded bg-ralBlue px-4 py-2 font-bold text-white', className)} {...props} />;
}
