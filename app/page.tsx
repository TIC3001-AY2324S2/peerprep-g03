import PeerprepLogo from '@/app/ui/peerprep-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {lusitana} from '@/app/ui/fonts';
import Image from 'next/image';
import Table from '@/app/ui/questions/table';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-40">      
        <PeerprepLogo />
      </div>
      <Table  />    
    </main>
  );
}
