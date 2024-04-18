import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6 items-center justify-center">
            <h1 className={`${lusitana.className} text-xl md:text-2xl mb-4`}>
                Access Forbidden
            </h1>
            <p className="text-lg font-bold text-red-600">
                You do not have permission to access this page.
            </p>
            <Image
                src="/forbidden.jpg" 
                width={500}
                height={300}
                alt="Access Denied"
            />
            <p className="text-center mt-4">
                This section is restricted to authorized users only. Contact support if you believe this is an error.
            </p>
        </main>
    );
}