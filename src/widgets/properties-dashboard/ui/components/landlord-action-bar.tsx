'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useQuery } from '@tanstack/react-query'
import { getMyListings } from '@/features/apartment-posting'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { ApartmentPostingForm } from '@/features/apartment-posting'
import { useCan } from '@/shared/lib/permissions'

interface UserStored {
  name: string
  email: string
  roles?: string[]
  kycStatus?: string
}

export function LandlordActionBar(): React.ReactElement | null {
  const [user, setUser] = React.useState<UserStored | null>(null)
  const [showPostingModal, setShowPostingModal] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user')
      const token = localStorage.getItem('accessToken')
      if (stored && token) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUser(JSON.parse(stored))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  const isLandlord = React.useMemo(() => {
    return user?.roles?.includes('landlord') || false
  }, [user])

  // Fetch landlord's listings to get pending count
  const { data: myListings = [] } = useQuery({
    queryKey: ['my-listings-count'],
    queryFn: getMyListings,
    enabled: !!isLandlord,
  })

  const pendingCount = React.useMemo(() => {
    return myListings.filter(item => item.status === 'pending').length
  }, [myListings])

  const can = useCan()
  const canPost = can('create', 'Apartment')

  if (!isLandlord) return null

  return (
    <>
      <div className="mb-8 p-6 rounded-2xl border border-border bg-surface flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-primary flex items-center justify-center shrink-0">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-fg">
              Công cụ quản lý tin đăng dành cho Chủ nhà
            </h3>
            <p className="font-body text-xs text-muted">
              Đăng tin căn hộ mới và theo dõi hàng chờ duyệt từ nhân viên hệ
              thống.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
          <Link
            href={'/profile?tab=listings' as Route}
            className="flex-1 md:flex-none"
          >
            <button className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border bg-surface rounded-xl text-xs font-bold text-fg hover:bg-surface-muted transition-all cursor-pointer">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pendingCount > 0 ? 'bg-warning' : 'bg-success'}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${pendingCount > 0 ? 'bg-warning' : 'bg-success'}`}
                />
              </span>
              Hàng chờ duyệt
              <span
                className={`ml-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${pendingCount > 0 ? 'bg-warning-soft text-fg' : 'bg-surface-muted text-muted'}`}
              >
                {pendingCount} tin
              </span>
            </button>
          </Link>

          {canPost ? (
            <button
              type="button"
              onClick={() => setShowPostingModal(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-control text-on-control rounded-xl text-xs font-bold hover:bg-primary-hover shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Đăng tin cho thuê
            </button>
          ) : null}
        </div>
      </div>

      {/* Apartment Posting Modal */}
      <Dialog open={showPostingModal} onOpenChange={setShowPostingModal}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border-border p-6 md:p-8"
          onPointerDownOutside={e => e.preventDefault()}
          onEscapeKeyDown={e => e.preventDefault()}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Đăng tin cho thuê căn hộ</DialogTitle>
            <DialogDescription>
              Hoàn thành biểu mẫu để đăng tin cho thuê căn hộ mới.
            </DialogDescription>
          </DialogHeader>
          <ApartmentPostingForm mode="create" noCard={true} />
        </DialogContent>
      </Dialog>
    </>
  )
}
