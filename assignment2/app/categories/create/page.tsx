import Form from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Landing Page', href: '/'},
                    {
                        label: 'Create Category',
                        href: '/categories/create',
                        active: true,
                    }
                ]}
            />
            <Form />
        </main>
    );
}