import Form from '@/app/ui/questions/edit-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
// import { notFound} from 'next/navigation';
import { categories } from '@/app/lib/placeholder-data';
import { fetchQuestionById } from '@/app/lib/data';
 
export default async function Page({params}:{params: {id: string}}) {
  const id = params.id;
  const questions = await fetchQuestionById(id);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Landing Page', href: '/' },
          {
            label: 'Edit Question',
            href: `/questions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form questions={questions} categories={categories}/>
    </main>
  );
}