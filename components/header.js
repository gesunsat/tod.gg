import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import ThemeSwitch from "./themeSwitch";
import Logo from "@/public/logo.svg";
import SearchCharcter from './rcc/searchCharacter';

export default function Header() {
  return (
    <header className="w-full">
      <Container className="flex py-5" style={{ height: "40px" }}>
        <Link href="/">
          <Image className="hidden dark:invert dark:block" src={Logo} alt="TOD.GG" height={40} />
          <Image className="dark:invert-0 dark:hidden" src={Logo} alt="TOD.GG" height={40} />
        </Link>
        <SearchCharcter />
        <ThemeSwitch />
      </Container>
      <Container className="flex justify-between py-5">
      </Container>
    </header >
  )
}