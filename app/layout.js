import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import Providers from './providers'
import { Noto_Sans_KR } from 'next/font/google';
import { cn } from "@/lib/utils"
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const interNotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata = {
  title: 'TOD.GG',
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

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TDN2JFVM58" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-TDN2JFVM58');
          `}
        </Script>

        <Script async src="//wcs.naver.net/wcslog.js" />
        <Script id="naver-analytics">
          {`
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "1fc1d575d28b680";
            if(window.wcs) {
              wcs_do();
            }
          `}
        </Script>
        <Script id="clarity">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "kiq42gxpes");
          `}
        </Script>
      </body>
    </html>
  )
}
