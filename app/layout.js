import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import Providers from './providers'
import Container from '@/components/container'

export const metadata = {
  title: 'TOD.GG',
  description: '메이플 캐릭터 조회',
}

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>
        <Providers>
          <Header />

          <Container large>{children}</Container>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
