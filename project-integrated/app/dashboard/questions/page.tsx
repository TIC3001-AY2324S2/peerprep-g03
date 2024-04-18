import { CreateQuestion, CreateCategory } from '@/app/ui/questions/buttons';
import { QuestionsTable, CategoriesTable } from '@/app/ui/questions/table';
import { fetchQuestions, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers'
import { getUsername } from '@/app/lib/action'
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const questions = await fetchQuestions();
  const categories = await fetchCategories();
  const token = cookies().get('accessToken')?.value
  const username = await getUsername(token)

  if (!questions || !categories) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Questions
      </h1>
      <p className="text-lg font-bold">Welcome, {username}!</p>
      <div className='flex flex-col md:flex-row'>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-[20px]">Categories Table</h1>
          <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <CreateCategory />
          </div>
          <CategoriesTable categories={categories} />
        </div>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-[20px]">Question Table</h1>
          <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <CreateQuestion />
          </div>
          <QuestionsTable questions={questions} />
        </div>
      </div>
    </main>
  );
}
