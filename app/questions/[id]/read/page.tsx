import Form from '@/app/ui/questions/read-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
import { getDataById } from '@/app/lib/placeholder-data';
import { notFound } from 'next/navigation';
// import { categories } from '@/app/lib/placeholder-data';
import { fetchQuestionById, fetchCategories } from '@/app/lib/data';


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  let questions;
  let categories;

  try {
    questions = await fetchQuestionById(id);
    categories = await fetchCategories();
  } catch (error) {
    notFound();
  }

  // console.log(questions);
  // console.log(categories);


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Landing Page', href: '/' },
          {
            label: 'Read Question',
            href: `/questions/${id}/read`,
            active: true,
          },
        ]}
      />
      <Form questions={questions} categories={categories} />
    </main>
  );
}