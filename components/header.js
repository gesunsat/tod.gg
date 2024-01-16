import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from './themeSwitch';
import LogoIcon from '@/public/logo.svg';
import SearchCharcter from './searchCharacter';
import DesktopNav from './desktopNav';

export default function Header() {
  return (
    <header className="w-full bg-card">
      <ThemeSwitch className="absolute top-5 left-3 block sm:hidden" height="20" />
      <div className="container mx-auto flex flex-col sm:flex-row">
        <Link href={"/"} className="self-center">
          <LogoIcon className="w-auto h-[20px] sm:h-[40px] m-5 sm:mx-0 self-center dark:fill-white dark:stroke-white " alt="TOD.GG" aria-label="TOD.GG" />
        </Link>
        <SearchCharcter className={"mx-0 sm:mx-4 flex-1 pb-5 sm:pt-5"} />
        <ThemeSwitch className="me-0 hidden sm:block py-5" height="40" />
      </div>
      <DesktopNav />
    </header>
  )
}