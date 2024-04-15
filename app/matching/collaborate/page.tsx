'use client'

import PeerprepLogo from '@/app/ui/peerprep-logo';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import CollaborateForm from '@/app/ui/matching/collaborate-form';
import MatchedQuestion from '@/app/ui/matching/question';


export default async function Page() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionid')
  const topics = searchParams.get('topics')
  const difficulty = searchParams.get('difficulty')
  console.log("session id from colloborate page: ", sessionId)
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">
        <div><PeerprepLogo /></div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div>
          <h1 className="text-[30px]">Collaboration</h1>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
        <div className="fflex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-5/6 md:px-20">
          {/* Find your match form here */}
          <h1 className="text-[20px]">Collaborated with your match</h1>
          <div className="relative ml-auto">
            <MatchedQuestion topics={topics} difficulty={difficulty}/>
            <CollaborateForm sessionId={sessionId} />
          </div>
        </div>
      </div>
    </main>
  );
}
