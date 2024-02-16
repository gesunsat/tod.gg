"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="block h-[48px] bg-muted">
      <div className="container px-4 sm:px-8 mx-auto overflow-auto">
        <ul className="flex w-full gap-5">

          <li className={cn("block relative border-black dark:border-white hover:border-b-4", pathname == "/guild" ? "border-b-4" : "")}>
            <Link href={"/guild"}>
              <div className="flex text-center leading-5 p-3 text-black dark:text-white box-border whitespace-nowrap">길드</div>
            </Link>
          </li>
          <li className={cn("block relative border-black dark:border-white hover:border-b-4", pathname.indexOf("/leaderboards/") == 0 ? "border-b-4" : "")}>
            <Link href={"/leaderboards/overall"}>
              <div className="flex text-center leading-5 p-3 text-black dark:text-white box-border whitespace-nowrap">랭킹</div>
            </Link>
          </li>
          {/* <li className={cn("block relative border-black dark:border-white hover:border-b-4", pathname == "/util" ? "border-b-4" : "")}>
            <Link href={"/"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">도구</div>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav >
  )
}