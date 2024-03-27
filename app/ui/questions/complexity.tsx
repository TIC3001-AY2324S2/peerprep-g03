import { AcademicCapIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function QuestionComplexity({ complexity }: { complexity: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': complexity === 'easy',
          'bg-orange-500 text-white': complexity === 'medium',
          'bg-red-500 text-white': complexity === 'hard',
        },
      )}
    >
      {complexity === 'easy' ? (
        <>
          Easy
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {complexity === 'medium' ? (
        <>
          Medium
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {complexity === 'hard' ? (
        <>
          Hard
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
