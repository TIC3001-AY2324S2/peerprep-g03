import { lusitana } from '@/app/ui/fonts';
import { cookies } from 'next/headers'
import { getUsername } from '@/app/lib/action'
import {QuestionsTableRead} from '@/app/ui/questions/table-read';
import { fetchQuestions } from '@/app/lib/data';
import Image from 'next/image';
 
export default async function Page() {
    const token = cookies().get('accessToken')?.value
    const username = await getUsername(token)
    const questions = await fetchQuestions();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <p className="text-lg font-bold">Welcome, {username}!</p>
            <div className="relative ml-auto">
                <h1 className="text-[20px]">Question Table</h1>
                <QuestionsTableRead questions={questions} />
            </div>
        </main>
    );
}