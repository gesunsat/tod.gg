import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import Providers from './providers'
import { Noto_Sans_KR } from 'next/font/google';
import { cn } from "@/lib/utils"

const interNotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata = {
  title: 'TOD.GG',
  description: '메이플 캐릭터 조회',
}

export default function RootLayout({ children }) {
  return (
    <html lang="kr" className="flex w-full min-h-full">
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
      </body>
    </html>
  )
}
