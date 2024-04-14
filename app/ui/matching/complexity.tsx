import { AcademicCapIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function MatchesComplexity({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': difficulty.toLowerCase() === 'easy',
          'bg-orange-500 text-white': difficulty.toLowerCase() === 'medium',
          'bg-red-500 text-white': difficulty.toLowerCase() === 'hard',
        },
      )}
    >
      {difficulty.toLowerCase() === 'easy' ? (
        <>
          Easy
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {difficulty.toLowerCase() === 'medium' ? (
        <>
          Medium
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {difficulty.toLowerCase() === 'hard' ? (
        <>
          Hard
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
