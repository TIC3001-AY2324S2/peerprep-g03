import Form from '@/app/ui/questions/read-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
import { getDataById } from '@/app/lib/placeholder-data'; 
import { notFound} from 'next/navigation';
import { categories } from '@/app/lib/placeholder-data';
import { fetchQuestionById } from '@/app/lib/data';

 
export default async function Page({params}:{params: {id: string}}) {
  const id = params.id;
  const questions = await fetchQuestionById(id);

  if(!questions){
    notFound();
  }
  
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
      <Form questions={questions} categories={categories}/>
    </main>
  );
}