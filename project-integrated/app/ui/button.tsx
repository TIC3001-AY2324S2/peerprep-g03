import clsx from 'clsx';

import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CreateAccountButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="flex w-full h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create new account</span>{' '}
      <span className="md:hidden">Create new account</span>{' '}
      {children}
    </button>
  );
}

export function LogInButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="flex w-full h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Log In</span>{' '}
      <span className="md:hidden">Log In</span>{' '}
      <ArrowRightEndOnRectangleIcon className="ml-auto h-5 w-5 text-gray-50" />
      {children}
    </button>
  );
}