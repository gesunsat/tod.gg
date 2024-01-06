"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="block h-[48px] px-4 bg-muted">
      <div className="container mx-auto overflow-auto">
        <ul className="flex w-full">
          <li className={cn("block relative border-black dark:border-white hover:border-b-4", pathname == "/rank" ? "border-b-4" : "")}>
            <Link className="pointer-events-none opacity-20" href={"/rank"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">랭킹</div>
            </Link>
          </li>
          <li className={cn("block relative border-black dark:border-white hover:border-b-4 ml-5", pathname == "/stat" ? "border-b-4" : "")}>
            <Link className="pointer-events-none opacity-20" href={"/stat"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">통계</div>
            </Link>
          </li>
          <li className={cn("block relative border-black dark:border-white hover:border-b-4 ml-5", pathname == "/util" ? "border-b-4" : "")}>
            <Link className="pointer-events-none opacity-20" href={"/util"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">도구</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}