import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from './themeSwitch';
import LogoIcon from '@/public/logo.svg';
import SearchCharcter from './rcc/searchCharacter';
import Nav from './nav';

export default function Header() {
  return (
    <header className="w-full bg-card">
      <div className="container mx-auto flex py-5 px-7 flex-col sm:flex-row">
        <div>
          <ThemeSwitch className="absolute top-5 right-3 block sm:hidden" height="20" />
          <Link href={"/"}>
            <LogoIcon className="mx-auto w-auto h-[20px] sm:h-[40px] mb-5 sm:mb-0 dark:fill-white dark:stroke-white " alt="TOD.GG" />
          </Link>
        </div>
        <SearchCharcter />
        <ThemeSwitch className="me-3 hidden sm:block" height="40" />
      </div>
      <Nav />
    </header>
  )
}