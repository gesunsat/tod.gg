import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import Providers from './providers'
import Container from '@/components/container'
import { Noto_Sans_KR } from 'next/font/google';

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata = {
  title: 'TOD.GG',
  description: '메이플 캐릭터 조회',
}

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Providers>
          <Header />

          <Container>{children}</Container>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
