import PeerprepLogo from '@/app/ui/peerprep-logo';
import { getUsername } from '@/app/lib/action'
import { questions } from '../lib/placeholder-data';
// import { notFound } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import MathchingForm from '@/app/ui/matching/find-match-form';
import { MatchingTable } from '@/app/ui/matching/table';
import { cookies } from 'next/headers'


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
          {/*
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
  */}
          <p className="text-lg font-bold">Welcome, {username}!</p>
        </div>
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          {/* Find your match form here */}
          <h1 className="text-[20px]">Find Matching here</h1>
          <div className="relative ml-auto">
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

