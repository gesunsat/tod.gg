import './globals.css'

export const metadata = {
  title: 'TOD.GG',
  description: '메이플 캐릭터 조회',
}

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  )
}
