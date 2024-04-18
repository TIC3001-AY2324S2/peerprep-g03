import { lusitana } from '@/app/ui/fonts';
import { cookies } from 'next/headers'
import { getUsername } from '@/app/lib/action'
import Image from 'next/image';


export default async function Page() {
    const token = cookies().get('accessToken')?.value
    const username = await getUsername(token)
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <p className="text-lg font-bold">Welcome, {username}!</p>
            <div className="relative ml-auto">
                <Image
                    src="/MatchingService.png"
                    width={3000}
                    height={2100}
                    className="hidden md:block"
                    alt="The Matching Service showing the interview"
                />
                <Image
                    src="/MatchingService.png"
                    width={560}
                    height={620}
                    className="md:hidden block"
                    alt="Screenshots of the Matching Service showing mobile version"
                />
            </div>
        </main>
    );
}