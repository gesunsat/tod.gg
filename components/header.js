import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import ThemeSwitch from './themeSwitch';
import Logo from '@/public/logo.svg';
import SearchCharcter from './rcc/searchCharacter';
import Nav from './nav';

export default function Header() {
  return (
    <header className="w-full">
      <Container className="flex py-5 flex-col sm:flex-row">
        <div>
          <ThemeSwitch className="absolute top-5 right-3 block sm:hidden" height="20" />
          <Link href={"/"}>
            <Image className="mx-auto w-auto h-[20px] sm:h-[40px] mb-5 sm:mb-0 hidden dark:invert dark:block" src={Logo} alt="TOD.GG" />
            <Image className="mx-auto w-auto h-[20px] sm:h-[40px] mb-5 sm:mb-0 dark:invert-0 dark:hidden" src={Logo} alt="TOD.GG" />
          </Link>
        </div>
        <SearchCharcter />
        <ThemeSwitch className="me-3 hidden sm:block" height="40" />
      </Container>
      <Nav />
    </header>
  )
}