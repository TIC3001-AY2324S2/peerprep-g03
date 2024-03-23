import PeerprepLogo from '@/app/ui/peerprep-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { CreateQuestion } from '@/app/ui/questions/buttons';
import Link from 'next/link';
import Search from '@/app/ui/search';
import {lusitana} from '@/app/ui/fonts';
import Image from 'next/image';
import Table from '@/app/ui/questions/table';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">      
        <PeerprepLogo />
      </div>
      <div className='w-full'>
            <div className='flex w-full items-center justify-between'>
                <h1 className={`${lusitana.className} text-2x1`}>Questions</h1>
            </div>        
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search placeholder='Search invoices...' />
                <CreateQuestion />
            </div>
            <Table />            
        </div>     
    </main>
  );
}
