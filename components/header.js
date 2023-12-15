import VercelLogo from "@/public/vercel.svg";
import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import ThemeSwitch from "./themeSwitch";

export default function Header() {
  return (
    <header class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <Container className="flex justify-between py-5" as="nav">
        <Link href="/">
          <Image src={VercelLogo} alt="Family Guy" />
        </Link>
        <ThemeSwitch />
      </Container>
    </header>
  )
}