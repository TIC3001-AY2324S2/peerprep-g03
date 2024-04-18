import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
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
                    { label: 'Dashboard', href: '/' },
                    {
                        label: 'Create Question',
                        href: '/dashboard/questions/create',
                        active: true,
                    }
                ]}
            />
            <Form categories={categories} />
        </main>
    );
}