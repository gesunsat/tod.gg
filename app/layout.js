import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import Providers from './providers'
import { Noto_Sans_KR } from 'next/font/google';
import { cn } from "@/lib/utils"
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import NaverAnalytics from '@/components/NaverAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';

const interNotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata = {
  title: '메이플 정보 검색 - TOD.GG 토드지지',
  description: '메이플스토리 캐릭터 검색 서비스 TOD.GG!',
  keywords: ['넥슨', '메이플', '스토리', '캐릭터', '조회', '검색', '본캐', '부캐', '유니온'],
  metadataBase: new URL('https://tod.gg'),
  openGraph: {
    siteName: 'TOD.GG',
    url: 'https://tod.gg',
    title: 'TOD.GG',
    description: '메이플스토리 캐릭터 검색 서비스 TOD.GG!',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR" className="flex w-full min-h-full">
      <GoogleAnalytics />
      <MicrosoftClarity />

      <body className={cn(interNotoSansKR.className, "dark:bg-card w-full min-h-full")}>
        <Providers>
          <div className="flex flex-col h-full">
            <Header />

            <div className="hidden lg:block mt-3 h-[250px] w-full max-w-[970px] border-[1px] rounded-lg border-neutral-500 mx-auto">
              <div className="text-center"></div>
            </div>

            <main className="flex-auto container mx-auto px-0 my-3">
              {children}
            </main>

            <div className="mb-3 h-[250px] w-full max-w-[970px] border-[1px] rounded-lg border-neutral-500 mx-auto">
              <div className="text-center"></div>
            </div>

            <Footer />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
