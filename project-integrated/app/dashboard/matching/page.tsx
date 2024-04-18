import { getUsername } from '@/app/lib/action'
import MathchingForm from '@/app/ui/matching/find-match-form';
import { cookies } from 'next/headers'
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const token = cookies().get('accessToken')?.value
  const username = await getUsername(token)

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Matching
      </h1>
      <p className="text-lg font-bold">Welcome, {username}!</p>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">        
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">          
          <h1 className="text-[20px] self-center">Find Matching here</h1>
          <div className="flex flex-col items-center">
            <MathchingForm username={username} />
          </div>
        </div>

      </div>
    </main>
  );
}