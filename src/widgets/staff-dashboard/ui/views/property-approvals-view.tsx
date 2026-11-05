'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { VrPreviewPanel } from './components/vr-preview-panel'
import { toast } from 'sonner'
import { ListingReviewQueue } from '@/features/listing-freshness'
import { AdminCard } from '@/shared/ui/admin-card'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { useCan } from '@/shared/lib/permissions'
import {
  mapApartmentStatus,
  APARTMENT_STATUS_LABELS,
  type ApartmentModerationStatus,
} from './lib/apartment-moderation'

// Khớp RejectApartmentDto.rejectedReason (@MinLength(10)) ở backend.
const REJECT_REASON_MIN_LENGTH = 10

interface Property {
  id: string
  title: string
  address: string
  price: string
  landlord: string
  phone: string
  status: ApartmentModerationStatus
  vrUrl: string
  images360: string[]
  gallery: string[]
}

interface BackendApartmentResponse {
  id: string
  title: string
  category: string
  location: string
  price: string
  status: string
  isVerified: boolean
  images360?: string[]
  gallery?: string[]
  vrUrl?: string
  landlord?: {
    fullName: string
    phone: string
  } | null
}

export function PropertyApprovalsView(): React.ReactElement {
  const can = useCan()
  const canApprove = can('approve', 'Apartment')
  const [properties, setProperties] = React.useState<Property[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedProp, setSelectedProp] = React.useState<Property | null>(null)
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  const mapProperty = React.useCallback(
    (apt: BackendApartmentResponse): Property => {
      return {
        id: apt.id || '',
        title: apt.title || '',
        address: apt.location || '',
        price: apt.price || 'Chưa cập nhật',
        landlord: apt.landlord?.fullName || 'Chủ nhà TH PropTech',
        phone: apt.landlord?.phone || 'Chưa cung cấp',
        status: mapApartmentStatus(apt.status),
        vrUrl: apt.vrUrl || '',
        images360: apt.images360 || [],
        gallery: apt.gallery || [],
      }
    },
    []
  )

  const loadProperties = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // GET /apartments là danh sách công khai (chỉ 'available' và 'rented'),
      // nên hàng chờ duyệt và bài bị từ chối lấy từ các endpoint dành cho staff/admin.
      const [pending, approved, rejected] = await Promise.all([
        apiClient.get<BackendApartmentResponse[]>(
          '/apartments/pending?format=web'
        ),
        apiClient.get<BackendApartmentResponse[]>('/apartments?format=web'),
        apiClient.get<BackendApartmentResponse[]>(
          '/apartments/rejected?format=web'
        ),
      ])
      setProperties([...pending, ...approved, ...rejected].map(mapProperty))
    } catch (err) {
      console.error('Failed to load apartments for moderation:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải danh sách tin đăng. Vui lòng thử lại.'
      )
      toast.error('Không thể tải danh sách tin đăng. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }, [mapProperty])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProperties()
  }, [loadProperties])

  const handleApprove = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/apartments/${id}/approve`, {})
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'approved' } : p))
      )
      setSelectedProp(null)
      toast.success('Đã phê duyệt tin đăng căn hộ thành công!')
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err)
      const isStatusError =
        errMessage.includes('đang chờ duyệt') ||
        errMessage.includes('400') ||
        (err as { statusCode?: number })?.statusCode === 400 ||
        (err as { code?: string })?.code === 'HTTP_400'

      if (isStatusError) {
        toast.error(
          'Tin này đã được xử lý hoặc không còn ở trạng thái chờ duyệt.'
        )
        await loadProperties()
        setSelectedProp(null)
      } else {
        toast.error(
          errMessage || 'Không thể phê duyệt căn hộ. Vui lòng thử lại.'
        )
      }
    }
  }

  const handleReject = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/apartments/${id}/reject`, {
        rejectedReason: rejectReason,
      })

      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'rejected' } : p))
      )
      setShowRejectDialog(false)
      setSelectedProp(null)
      setRejectReason('')
      toast.info('Đã từ chối tin đăng căn hộ.')
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err)
      const isStatusError =
        errMessage.includes('đang chờ duyệt') ||
        errMessage.includes('400') ||
        (err as { statusCode?: number })?.statusCode === 400 ||
        (err as { code?: string })?.code === 'HTTP_400'

      if (isStatusError) {
        toast.error(
          'Tin này đã được xử lý hoặc không còn ở trạng thái chờ duyệt.'
        )
        await loadProperties()
        setShowRejectDialog(false)
        setSelectedProp(null)
        setRejectReason('')
      } else {
        toast.error(errMessage || 'Không thể từ chối căn hộ. Vui lòng thử lại.')
      }
    }
  }

  const filteredProps = properties.filter(p => {
    if (filter === 'all') return true
    return p.status === filter
  })

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ListingReviewQueue hideWhenEmpty />
      {/* Title & Filter headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">
            Danh sách tin đăng căn hộ
          </h2>
          <p className="text-xs text-muted mt-1">
            Kiểm tra thông tin pháp lý, chất lượng ảnh quét VR 360° trước khi
            hiển thị lên hệ thống.
          </p>
        </div>
        <div className="flex flex-wrap rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            type="button"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            type="button"
            aria-pressed={filter === 'pending'}
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({properties.filter(p => p.status === 'pending').length})
          </button>
          <button
            type="button"
            aria-pressed={filter === 'approved'}
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã duyệt
          </button>
          <button
            type="button"
            aria-pressed={filter === 'rejected'}
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-line bg-surface-muted/30">
          <p className="text-xs text-muted font-medium">
            Đang tải danh sách tin đăng...
          </p>
        </div>
      ) : error ? (
        <AdminErrorState
          title="Lỗi tải danh sách tin đăng"
          message={error}
          onRetry={loadProperties}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProps.map(prop => (
            <AdminCard
              key={prop.id}
              className="overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-display px-2.5 py-0.5 rounded bg-fg/5 text-muted uppercase">
                    {prop.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      prop.status === 'approved'
                        ? 'bg-accent-2/10 text-accent-2'
                        : prop.status === 'rejected'
                          ? 'bg-accent/10 text-accent'
                          : prop.status === 'pending'
                            ? 'bg-accent-3/10 text-accent-3'
                            : 'bg-muted/10 text-muted'
                    }`}
                  >
                    {APARTMENT_STATUS_LABELS[prop.status] ?? 'Không rõ'}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-fg leading-snug font-marketing line-clamp-1">
                  {prop.title}
                </h3>
                <p className="text-xs text-subtle mt-1 flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {prop.address}
                </p>
                <div className="mt-4 border-t border-line/50 pt-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-subtle block">Giá thuê</span>
                    <span className="font-bold text-fg">{prop.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-subtle block">Chủ nhà</span>
                    <span className="font-semibold text-fg">
                      {prop.landlord}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1.5 border-t border-line/30 bg-surface-muted/10">
                <button
                  type="button"
                  onClick={() => setSelectedProp(prop)}
                  className="w-full py-2 bg-fg/5 hover:bg-fg/10 text-fg text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Thẩm định & Duyệt
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Inspect Drawer/Modal */}
      {selectedProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div
            className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
            onClick={() => setSelectedProp(null)}
          />

          <AdminCard className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl h-[90vh] shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Left side: VR 360 / Media Preview */}
            <VrPreviewPanel
              images360={selectedProp.images360}
              gallery={selectedProp.gallery}
              vrUrl={selectedProp.vrUrl}
            />

            {/* Right side: Property Details */}
            <div className="w-full lg:w-[420px] flex flex-col h-full bg-surface overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-line bg-surface-muted/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-primary font-display">
                    {selectedProp.id}
                  </span>
                  <h2 className="text-sm font-bold text-fg font-marketing mt-0.5">
                    {selectedProp.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProp(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-fg/5 hover:text-fg transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Form body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
                    Thông tin căn hộ
                  </h4>
                  <div className="mt-2.5 space-y-2 text-xs">
                    <p className="text-muted">
                      <strong className="text-fg font-medium">Địa chỉ:</strong>{' '}
                      {selectedProp.address}
                    </p>
                    <p className="text-muted">
                      <strong className="text-fg font-medium">
                        Giá đề xuất:
                      </strong>{' '}
                      {selectedProp.price}
                    </p>
                    <p className="text-muted">
                      <strong className="text-fg font-medium">
                        Người đăng:
                      </strong>{' '}
                      {selectedProp.landlord} ({selectedProp.phone})
                    </p>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              {selectedProp.status === 'pending' && canApprove && (
                <div className="p-4 border-t border-line bg-surface-muted/20 space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectDialog(true)}
                      className="flex-1 py-2.5 bg-surface border border-accent hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors"
                    >
                      Từ chối duyệt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedProp.id)}
                      className="flex-1 py-2.5 bg-accent-2 hover:bg-accent-2/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Phê duyệt tin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </AdminCard>
        </div>
      )}

      {/* Reject dialog */}
      <Dialog
        open={showRejectDialog && !!selectedProp}
        onOpenChange={open => {
          if (!open) {
            setShowRejectDialog(false)
            setRejectReason('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lý do từ chối tin đăng</DialogTitle>
            <DialogDescription>
              Nêu rõ lý do để chủ nhà nhận được thông báo phản hồi và chỉnh sửa
              lại.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Ví dụ: Giấy tờ sở hữu bị mờ hoặc ảnh quét 360° có chất lượng kém..."
              rows={4}
              className="resize-none text-xs"
            />
            <p className="text-[11px] text-muted">
              Tối thiểu {REJECT_REASON_MIN_LENGTH} ký tự (
              {rejectReason.trim().length}/{REJECT_REASON_MIN_LENGTH}).
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowRejectDialog(false)
                setRejectReason('')
              }}
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                if (selectedProp) void handleReject(selectedProp.id)
              }}
              disabled={rejectReason.trim().length < REJECT_REASON_MIN_LENGTH}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
