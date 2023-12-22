"use client";

import Link from 'next/link'
import Container from './container'
import { usePathname } from 'next/navigation';
import { cx } from '@/utils/all';

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="block h-[48px] px-4 bg-neutral-300 dark:bg-neutral-800">
      <Container className="overflow-auto">
        <ul className="flex w-full">
          <li className={cx("block relative hover:border-b-4", pathname == "/rank" ? "border-b-4" : "")}>
            <Link href={"/rank"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">랭킹</div>
            </Link>
          </li>
          <li className={cx("block relative hover:border-b-4 ml-5", pathname == "/stat" ? "border-b-4" : "")}>
            <Link href={"/stat"}>
              <div className="flex text-center leading-5 py-3 text-black dark:text-white box-border whitespace-nowrap">통계</div>
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}