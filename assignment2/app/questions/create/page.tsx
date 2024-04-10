import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
// import { categories } from '@/app/lib/placeholder-data';
import { fetchQuestions, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page() {
    let categories;
    try {
        categories = await fetchCategories();
    } catch (error) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Landing Page', href: '/' },
                    {
                        label: 'Create Question',
                        href: '/questions/create',
                        active: true,
                    }
                ]}
            />
            <Form categories={categories} />
        </main>
    );
}