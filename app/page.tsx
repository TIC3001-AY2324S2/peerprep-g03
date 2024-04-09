import PeerprepLogo from '@/app/ui/peerprep-logo';
import { CreateQuestion, CreateCategory, SignUpButton, LogInButton } from '@/app/ui/questions/buttons';
import Search from '@/app/ui/search';
import { QuestionsTable, CategoriesTable } from '@/app/ui/questions/table';
// import { categories } from './lib/placeholder-data';
import { fetchQuestions, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Sign } from 'crypto';
import Image from 'next/image';


export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">
        <div><PeerprepLogo /></div>
        <div className="ml-auto flex gap-4">
          <SignUpButton />
          <LogInButton />
        </div>
      </div>

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <h1 className="text-[30px]">Matching Page</h1>

        <div className="fflex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          {/* Add Hero Images Here */}
          <div className="relative ml-auto">
            <Image
              src="/MatchingService.png"
              width={3000}
              height={2100}
              className="hidden md:block"
              alt="The Matching Service showing the interview"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
