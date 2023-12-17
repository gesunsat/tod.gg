import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import ThemeSwitch from "./themeSwitch";
import Logo from "@/public/logo.svg";
import SearchCharcter from './rcc/searchCharacter';

export default function Header() {
  return (
    <header className="w-full">
      <Container className="flex py-5 flex-col sm:flex-row">
        <div>
          <Link href="/" className="block mb-3">
            <Image className="mx-auto hidden dark:invert dark:block" src={Logo} alt="TOD.GG" height={40} />
            <Image className="mx-auto dark:invert-0 dark:hidden" src={Logo} alt="TOD.GG" height={40} />
          </Link>
          <ThemeSwitch className="absolute top-6 right-3 block sm:hidden" height="30" />
        </div>
        <SearchCharcter />
        <ThemeSwitch className="me-3 hidden sm:block" height="40" />
      </Container>
    </header >
  )
}