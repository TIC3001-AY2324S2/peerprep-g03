import { AcademicCapIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function QuestionComplexity({ complexity }: { complexity: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': complexity.toLowerCase() === 'easy',
          'bg-orange-500 text-white': complexity.toLowerCase() === 'medium',
          'bg-red-500 text-white': complexity.toLowerCase() === 'hard',
        },
      )}
    >
      {complexity.toLowerCase() === 'easy' ? (
        <>
          Easy
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {complexity.toLowerCase() === 'medium' ? (
        <>
          Medium
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {complexity.toLowerCase() === 'hard' ? (
        <>
          Hard
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
