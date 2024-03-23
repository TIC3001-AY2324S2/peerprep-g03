import Form from '@/app/ui/questions/create-form';
import Breadcrumbs from '@/app/ui/questions/breadcrumbs';

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Invoices', href: '/dashboard/invoices'},
                    {
                        label: 'Create Question',
                        href: '/dashboard/invoices/create',
                        active: true,
                    }
                ]}
            />
            <Form  />
        </main>
    );
}