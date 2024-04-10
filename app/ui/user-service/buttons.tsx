import { PencilIcon, PlusIcon, TrashIcon, BookOpenIcon, ArrowRightEndOnRectangleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteQuestion, deleteCategory } from '@/app/lib/action';

export function LogInButton() {
  return (
    <Link
      href="/user-service/login"
      className="flex w-full h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Log In</span>
      <ArrowRightEndOnRectangleIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Link>
  );
}

export function CreateAccountButton() {
  return (
    <Link
      href="/user-service/create"
      className="flex w-full h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create new account</span>
    </Link>
  );
}

export function AlreadyHaveAccount() {
  return (
    <div className="text-[13px]">
      Already have an account ? {' '}
      < Link
        href="/user-service/login" className="text-blue-500 underline" >Log In</Link >
    </div >
  );
}

export function DontHaveAccount() {
  return (
    <div className="text-[13px]">
      Don't have an account ? {' '}
      < Link
        href="/user-service/create" className="text-blue-500 underline" >Sign up now</Link >
    </div >
  );
}
