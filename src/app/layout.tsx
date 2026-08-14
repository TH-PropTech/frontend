import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Space_Grotesk, Lora } from 'next/font/google'
import { Suspense } from 'react'
import { PageTransition } from '@/shared/ui/page-transition'
import { Providers } from './providers'
import { AiAssistantPanel } from '@/widgets/ai-assistant-panel'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-marketing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | TH PropTech',
    default: 'TH PropTech — Hệ thống thuê căn hộ tích hợp Blockchain',
  },
  description:
    'Tìm kiếm, đặt lịch xem, đặt cọc và ký hợp đồng thuê căn hộ chung cư minh bạch với công nghệ Blockchain.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${spaceGrotesk.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <body className={beVietnamPro.className} suppressHydrationWarning>
        <Providers>
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
          {children}
          <AiAssistantPanel />
        </Providers>
      </body>
    </html>
  )
}
