import PeerprepLogo from '@/app/ui/peerprep-logo';
import { getUsername } from '@/app/lib/action'
import { questions } from '../lib/placeholder-data';
// import { notFound } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import MathchingForm from '@/app/ui/matching/find-match-form';
import { MatchingTable } from '@/app/ui/matching/table';
import { cookies } from 'next/headers'
import Link from 'next/link';


export default async function Page() {
  const token = cookies().get('accessToken')?.value
  const username = await getUsername(token)

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">
        <div><PeerprepLogo /></div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div>
          <h1 className="text-[30px]">Matching</h1>
          <Link href="/api/logout" className="flex items-center px-3 py-2 bg-white rounded hover:bg-blue-200">
            <PowerIcon className="w-4 h-4 mr-2" />
            <span>Sign Out</span>
          </Link>
          <p className="text-lg font-bold">Welcome, {username}!</p>
        </div>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          {/* Find your match form here */}
          <h1 className="text-[20px] self-center">Find Matching here</h1>
          <div className="flex flex-col items-center">
            <MathchingForm username={username} />
          </div>
        </div>

        {/*<div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          <h1 className="text-[20px]">Potential Matches</h1>
          <div className="ml-auto flex gap-4">
            {/*<MatchingTable questions={questions} />*/}
        {/*</div>
        </div>*/}

      </div>
    </main>
  );
}
