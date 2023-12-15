import VercelLogo from "@/public/vercel.svg";
import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import ThemeSwitch from "./themeSwitch";
import Logo from "@/public/logo.svg";

export default function Header() {
  return (
    <header className="w-full transition-colors duration-500">
      <Container className="flex justify-between py-5" as="nav">
        <Link href="/">
          <Image className="hidden dark:invert dark:block" src={Logo} alt="TOD.GG"/>
          <Image className="dark:invert-0 dark:hidden" src={Logo} alt="TOD.GG"/>
        </Link>
        <ThemeSwitch />
      </Container>
    </header>
  )
}