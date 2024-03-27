import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';
import { categories } from '@/app/lib/placeholder-data';

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Landing Page', href: '/'},
                    {
                        label: 'Create Question',
                        href: '/questions/create',
                        active: true,
                    }
                ]}
            />
            <Form  categories={categories}/>
        </main>
    );
}