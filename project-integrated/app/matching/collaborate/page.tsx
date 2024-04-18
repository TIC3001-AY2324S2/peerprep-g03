'use client'

import PeerprepLogo from '@/app/ui/peerprep-logo';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import CollaborateForm from '@/app/ui/matching/collaborate-form';
import MatchedQuestion from '@/app/ui/matching/question';
import { getUsername } from '@/app/lib/action'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Page() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionid')
  const topics = searchParams.get('topics')
  const difficulty = searchParams.get('difficulty')
  const peer = searchParams.get('peer')
  const [username, setUsername] = useState('')
  const [collaborationEnded, setCollaborationEnded] = useState(false)


  useEffect(() => {
    async function fetchUsername() {
      const token = getCookie('accessToken')?.toString()
      const username = await getUsername(token?.toString());
      setUsername(username)
    }
    fetchUsername()
  }, [])

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">
        <PeerprepLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div>
          <h1 className="text-[30px]">Collaboration</h1>
          <Link href='/api/logout' className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Link>
          <p className="text-lg font-bold">Welcome, {username}!</p>
        </div>
        <div className="flex flex-col gap-6 grow rounded-lg bg-gray-50 p-6 md:px-20 md:flex-1">
          <h1 className="text-[20px]">Collaborate with {peer}</h1>
          <div className="relative flex-1 ml-auto w-full">
            <MatchedQuestion topics={topics} difficulty={difficulty} />
            <CollaborateForm sessionId={sessionId} username={username} collaborationEnded={collaborationEnded} setCollaborationEnded={setCollaborationEnded} />
          </div>
        </div>
      </div>
    </main>
  );
}