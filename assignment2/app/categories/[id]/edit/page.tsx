import Form from '@/app/ui/categories/edit-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCategoryById } from '@/app/lib/data';
 
export default async function Page({params}:{params: {id: string}}) {
  const id = params.id;
  const categories = await fetchCategoryById(id);
  
  if(!categories){
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Landing Page', href: '/' },
          {
            label: 'Edit Categories',
            href: `/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form categories={categories}/>
    </main>
  );
}