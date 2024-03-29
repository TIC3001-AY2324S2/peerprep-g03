import PeerprepLogo from '@/app/ui/peerprep-logo';
import { CreateQuestion, CreateCategory } from '@/app/ui/questions/buttons';
import Search from '@/app/ui/search';
import { QuestionsTable, CategoriesTable } from '@/app/ui/questions/table';
import { fetchQuestions, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page() {
  let questions;
  let categories;
  try {
    questions = await fetchQuestions();
    categories = await fetchCategories();
    
  } catch (error) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">
        <PeerprepLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <h1 className="text-[30px]">Landing Page</h1>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-[20px]">Catetories Table</h1>
          <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <CreateCategory />
          </div>
          <CategoriesTable categories={categories} />
        </div>
        <div className="fflex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-[20px]">Question Table</h1>
          {/* Add Hero Images Here */}
          {/*<Search placeholder='Search questions...' />*/}
          <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <CreateQuestion />
          </div>
          <QuestionsTable questions={questions} />
        </div>
      </div>
    </main>

  );
}
