import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from './themeSwitch';
import LogoIcon from '@/public/logo.svg';
import SearchCharcter from './searchCharacter';
import DesktopNav from './desktopNav';

export default async function Header() {
  return (
    <header className="w-full bg-card">
      <div className="container px-0 sm:px-8 mx-auto flex flex-col sm:flex-row">
        <div className="relative">
          <ThemeSwitch className="absolute sm:hidden left-5 top-1/2 -translate-y-1/2" height="20" />
          <div className="flex justify-center">
            <Link href={"/"} className="self-center">
              <LogoIcon className="w-auto h-[20px] sm:h-[40px] m-5 sm:mx-0 self-center dark:fill-white dark:stroke-white " alt="TOD.GG" aria-label="TOD.GG" />
            </Link>
          </div>
        </div>
        <div className="container sm:px-0 flex gap-3 ms-0 sm:ms-3">
          <SearchCharcter className="flex-1 pb-5 sm:pt-5" />
          <ThemeSwitch className="hidden sm:block py-5" height="40" />
        </div>
      </div>
      <DesktopNav />
    </header>
  )
}