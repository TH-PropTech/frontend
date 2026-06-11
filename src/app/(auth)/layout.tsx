import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'
import { Logo } from '@/shared/ui/logo'
import { AuthBrandingPanel } from '@/features/auth/ui/auth-branding-panel'

export const metadata: Metadata = {
  title: {
    template: '%s | TH PropTech',
    default: 'Xác thực | TH PropTech',
  },
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <div className="flex min-h-screen">
      {/* ── Left Panel: Client-side branding with theme toggle ── */}
      <AuthBrandingPanel />

      {/* ── Right Panel: Form ── */}
      <div className="flex flex-1 flex-col bg-bg">
        {/* Mobile logo */}
        <div className="flex items-center justify-between px-6 pt-6 lg:hidden">
          <Link
            href={'/' as Route}
            className="hover:opacity-85 transition-opacity"
          >
            <Logo size="md" />
          </Link>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-subtle">
            &copy; 2026 TH PropTech. H&#7879; th&#7889;ng thu&#234; c&#259;n
            h&#7897; t&#237;ch h&#7907;p Blockchain.
          </p>
        </div>
      </div>
    </div>
  )
}
