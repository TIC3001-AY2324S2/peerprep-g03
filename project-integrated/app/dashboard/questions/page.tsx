import PeerprepLogo from '@/app/ui/peerprep-logo';
import { CreateQuestion, CreateCategory } from '@/app/ui/questions/buttons';
import Search from '@/app/ui/search';
import { QuestionsTable, CategoriesTable } from '@/app/ui/questions/table';
import { fetchQuestions, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page() {
  const questions = await fetchQuestions();
  const categories = await fetchCategories();

  if (!questions || !categories) {
    notFound();
  }

  return (
    <div className='flex'>
      <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/6 md:px-20">
        <h1 className="text-[20px]">Catetories Table</h1>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
          <CreateCategory />
        </div>
        <CategoriesTable categories={categories} />
      </div>
      <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/6 md:px-20">
        <h1 className="text-[20px]">Question Table</h1>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
          <CreateQuestion />
        </div>
        <QuestionsTable questions={questions} />
      </div>
    </div>
  );
}
