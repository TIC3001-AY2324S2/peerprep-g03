import Form from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Dashboard', href: '/dashboard'},
                    {
                        label: 'Create Category',
                        href: '/dashboard/categories/create',
                        active: true,
                    }
                ]}
            />
            <Form />
        </main>
    );
}