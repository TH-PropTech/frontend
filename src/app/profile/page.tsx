import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { ProfileWidget } from '@/widgets/profile-dashboard'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden flex flex-col justify-between">
      {/* Inline styles for OCR scanning animation */}
      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
        }
        .animate-scan-line {
          position: absolute;
          animation: scan-line 2.5s ease-in-out infinite;
        }
      `}</style>

      <div>
        <HomeHeader />

        <main className="w-full pt-36 pb-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <ProfileWidget />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
