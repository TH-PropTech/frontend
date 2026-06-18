import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Logo } from './logo'

/* ─────────────────── SVG Icon Components ─────────────────── */

function IconMapPin(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconMail(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function IconShield(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconCube(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}

function IconBrain(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  )
}

function IconArrowUpRight(
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function IconGithub(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function IconFacebook(
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  )
}

/* ─────────────────── Navigation Data ─────────────────── */

const NAV_PRODUCT = [
  { label: 'Tìm căn hộ', href: '/properties' },
  { label: 'Không gian VR 3D', href: '/vr' },
  { label: 'Quy trình thuê', href: '/process' },
] as const

const NAV_ABOUT = [
  { label: 'Giới thiệu hệ thống', href: '/process' },
  { label: 'Cơ chế AI gợi ý', href: '/process' },
  { label: 'Blockchain minh bạch', href: '/process' },
  { label: 'Điều khoản sử dụng', href: '/process' },
] as const

const TECH_BADGES = [
  { icon: IconShield, label: 'Blockchain' },
  { icon: IconCube, label: 'VR 3D' },
  { icon: IconBrain, label: 'AI' },
] as const

/* ─────────────────── Footer Component ─────────────────── */

export function Footer(): React.ReactElement {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {/* Subtle warm gradient accent — keeps earthy feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-24 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -right-24 h-56 w-56 rounded-full bg-accent/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* ── Top: Main footer grid ── */}
        <div className="grid grid-cols-1 gap-10 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Logo size="md" />
            <p className="mt-4 max-w-xs font-body text-[13px] leading-relaxed text-muted">
              Nền tảng thuê căn hộ chung cư thế hệ mới — kết hợp tìm kiếm thông
              minh, trải nghiệm VR 3D và minh bạch giao dịch trên Blockchain.
            </p>

            {/* Tech badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TECH_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted"
                >
                  <Icon className="h-3 w-3 text-primary" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            {/* Payment & Escrow Partner */}
            <div className="mt-6 border-t border-border/60 pt-4">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">
                Đối tác liên kết giữ tiền &amp; ký quỹ
              </span>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center rounded-md bg-[#E01E26] px-2 py-0.5 text-white font-display font-black text-[11px] tracking-tight uppercase">
                  Techcombank
                </div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-fg">
              Sản phẩm
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_PRODUCT.map(({ label, href }) => (
                <li key={href + label}>
                  <Link
                    href={href as Route}
                    className="group inline-flex items-center gap-1.5 font-body text-[13px] text-muted transition-colors duration-200 hover:text-primary"
                  >
                    <IconArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1"
                      aria-hidden="true"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-fg">
              Thông tin
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ABOUT.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href as Route}
                    className="group inline-flex items-center gap-1.5 font-body text-[13px] text-muted transition-colors duration-200 hover:text-primary"
                  >
                    <IconArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1"
                      aria-hidden="true"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="mailto:contact@th-proptech.vn"
                className="inline-flex items-center gap-2 font-body text-[12px] text-muted transition-colors hover:text-primary"
              >
                <IconMail className="h-3.5 w-3.5" aria-hidden="true" />
                contact@th-proptech.vn
              </a>
              <a
                href="tel:+84901234567"
                className="inline-flex items-center gap-2 font-body text-[12px] text-muted transition-colors hover:text-primary"
              >
                <IconPhone className="h-3.5 w-3.5" aria-hidden="true" />
                (+84) 901 234 567
              </a>
              <span className="inline-flex items-center gap-2 font-body text-[12px] text-muted">
                <IconMapPin
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                TP. Hồ Chí Minh, Việt Nam
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-border" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <span className="font-display text-xs font-bold text-fg">
              © {new Date().getFullYear()} TH-PropTech
            </span>
            <span className="font-body text-[11px] text-muted">
              Khóa luận tốt nghiệp ngành KTPM
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/TH-PropTech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm"
              aria-label="GitHub"
            >
              <IconGithub className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm"
              aria-label="Facebook"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] text-subtle">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
