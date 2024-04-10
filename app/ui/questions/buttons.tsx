import { PencilIcon, PlusIcon, TrashIcon, BookOpenIcon, ArrowRightEndOnRectangleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteQuestion, deleteCategory } from '@/app/lib/action';

export function CreateQuestion() {
  return (
    <Link
      href="/questions/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Question</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function LogInButton() {
  return (
    <Link
      href="/user-service/signin"
      className="flex w-full h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"      
    >
      <span className="hidden md:block">Log In</span>{' '}
      <ArrowRightEndOnRectangleIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateAccountButton() {
  return (
    <Link
      href="/user-service/signin"
      className="flex w-full h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"      
    >
      <span className="hidden md:block">Log In</span>{' '}
      <ArrowRightEndOnRectangleIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateCategory() {
  return (
    <Link
      href="/categories/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Category</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateQuestion({ id }: { id: string }) {
  return (
    <Link
      href={`/questions/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/categories/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ReadQuestion({ id }: { id: string }) {
  return (
    <Link
      href={`/questions/${id}/read`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <BookOpenIcon className="w-5" />
    </Link>
  );
}

export function DeleteQuestion({ id }: { id: string }) {
  const deleteQuestionWithId = deleteQuestion.bind(null, id);
  return (
    <form action={deleteQuestionWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteCatetory({ id }: { id: string }) {  
  const deleteCategoryWithId = deleteCategory.bind(null, id);
  return (
    <form action={deleteCategoryWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
