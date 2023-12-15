import VercelLogo from "@/public/vercel.svg";

/**
Renders a navigation component with a sticky header, containing a logo and a link to take a quiz.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import Image from 'next/image'
import Container from './container'

export default function Header() {
  return (
    <header>
      <Container className="flex justify-between py-5" as="nav">
        <Link href="/">
          <Image src={VercelLogo} alt="Family Guy" width={70} height={50} />
        </Link>
        <Link
          href="/quiz"
          className="flex items-center justify-center gap-1 px-5 font-semibold text-black transition-colors bg-green-500 rounded-md duration-600 hover:bg-green-600"
        >
          <div className="text-lg">
            Take a Quiz
          </div>
        </Link>
      </Container>
    </header>
  )
}