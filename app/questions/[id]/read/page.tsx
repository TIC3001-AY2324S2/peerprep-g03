import Form from '@/app/ui/questions/read-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
import { getDataById } from '@/app/lib/placeholder-data'; 
// import { notFound} from 'next/navigation';
import { categories } from '@/app/lib/placeholder-data';
 
export default async function Page({params}:{params: {id: string}}) {
  const id = params.id;
  const questionById = getDataById(id);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Questions', href: '/' },
          {
            label: 'Read Question',
            href: `/questions/${id}/read`,
            active: true,
          },
        ]}
      />
      <Form questions={questionById} categories={categories}/>
    </main>
  );
}