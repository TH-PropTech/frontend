import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TH PropTech',
  description: 'Workspace for property technology operations',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
