import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default function PeerprepLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Link
        href="/"
        className="flex w-full h-10 items">
        <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
        <p className="text-[25px]">PeerPrep-G03</p>
      </Link>
    </div>
  );
}
