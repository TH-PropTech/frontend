'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { VrPreviewPanel } from './components/vr-preview-panel'
import { toast } from 'sonner'

interface Property {
  id: string
  title: string
  address: string
  price: string
  landlord: string
  phone: string
  documents: string[]
  status: 'pending' | 'approved' | 'rejected'
  vrUrl: string
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
  const [properties, setProperties] = React.useState<Property[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedProp, setSelectedProp] = React.useState<Property | null>(null)
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  const mapProperty = React.useCallback(
    (apt: BackendApartmentResponse): Property => {
      let mappedStatus: 'pending' | 'approved' | 'rejected' = 'pending'
      if (apt.status === 'available') {
        mappedStatus = 'approved'
      } else if (apt.status === 'rejected' || apt.status === 'unavailable') {
        mappedStatus = 'rejected'
      }

      return {
        id: apt.id || '',
        title: apt.title || '',
        address: apt.location || '',
        price: apt.price || 'Chưa cập nhật',
        landlord: apt.landlord?.fullName || 'Chủ nhà TH PropTech',
        phone: apt.landlord?.phone || 'Chưa cung cấp',
        documents: [
          'Giấy chứng nhận quyền sở hữu nhà ở',
          'Bản quét hồ sơ pháp lý căn hộ',
        ],
        status: mappedStatus,
        vrUrl: apt.vrUrl || 'https://panoramas.example.com/tour',
      }
    },
    []
  )

  const loadProperties = React.useCallback(async () => {
    setLoading(true)
    try {
      const data =
        await apiClient.get<BackendApartmentResponse[]>('/apartments')
      setProperties(data.map(mapProperty))
    } catch (err) {
      console.error('Failed to load apartments for moderation:', err)
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
      console.error('Failed to approve apartment:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể phê duyệt căn hộ. Vui lòng thử lại.'
      toast.error(message)
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
      console.error('Failed to reject apartment:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể từ chối căn hộ. Vui lòng thử lại.'
      toast.error(message)
    }
  }

  const filteredProps = properties.filter(
    p => filter === 'all' || p.status === filter
  )

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
        <div className="flex rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({properties.filter(p => p.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProps.map(prop => (
          <div
            key={prop.id}
            className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-display px-2.5 py-0.5 rounded bg-fg/5 text-muted uppercase">
                  {prop.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    prop.status === 'approved'
                      ? 'bg-accent-2/10 text-accent-2'
                      : prop.status === 'rejected'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-accent-3/10 text-accent-3'
                  }`}
                >
                  {prop.status === 'approved'
                    ? 'Đã duyệt'
                    : prop.status === 'rejected'
                      ? 'Bị từ chối'
                      : 'Chờ duyệt'}
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
                  <span className="font-semibold text-fg">{prop.landlord}</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-1.5 border-t border-line/30 bg-surface-muted/10">
              <button
                onClick={() => setSelectedProp(prop)}
                className="w-full py-2 bg-fg/5 hover:bg-fg/10 text-fg text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
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
          </div>
        ))}
      </div>

      {/* Inspect Drawer/Modal */}
      {selectedProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div
            className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
            onClick={() => setSelectedProp(null)}
          />

          <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-5xl h-[85vh] bg-surface rounded-xl border border-line shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Left side: VR 360 Preview (Simulated interactive container) */}
            <VrPreviewPanel />

            {/* Right side: Property Details and Document Verification */}
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

                <div className="border-t border-line/60 pt-4">
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
                    Hồ sơ pháp lý đính kèm
                  </h4>
                  <div className="mt-2.5 space-y-2">
                    {selectedProp.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-bg/40 border border-line rounded-lg text-xs hover:bg-bg/60 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#d04a1e"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="font-semibold text-fg truncate flex-1">
                          {doc}
                        </span>
                        <span className="text-[10px] text-accent-2 font-medium bg-accent-2/10 px-1.5 py-0.5 rounded">
                          PDF
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-line/60 pt-4">
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
                    Trạng thái kiểm duyệt ảnh 360°
                  </h4>
                  <div className="mt-2.5 p-3.5 bg-accent-2/5 border border-accent-2/10 rounded-lg text-xs flex gap-2.5">
                    <svg
                      className="text-accent-2 mt-0.5 shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div>
                      <p className="font-semibold text-accent-2">
                        Ảnh quét đạt tiêu chuẩn
                      </p>
                      <p className="text-[10px] text-muted mt-0.5">
                        Không phát hiện méo ảnh, đủ độ sáng, các điểm di chuyển
                        liên kết chính xác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              {selectedProp.status === 'pending' && (
                <div className="p-4 border-t border-line bg-surface-muted/20 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowRejectDialog(true)}
                      className="flex-1 py-2.5 bg-surface border border-accent hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors"
                    >
                      Từ chối duyệt
                    </button>
                    <button
                      onClick={() => handleApprove(selectedProp.id)}
                      className="flex-1 py-2.5 bg-accent-2 hover:bg-accent-2/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Phê duyệt tin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject dialog */}
      {showRejectDialog && selectedProp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-fg/50 backdrop-blur-sm"
            onClick={() => setShowRejectDialog(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">
                Lý do từ chối tin đăng
              </h3>
              <p className="text-xs text-muted mt-1">
                Nêu rõ lý do để chủ nhà nhận được thông báo phản hồi và chỉnh
                sửa lại.
              </p>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Giấy tờ sở hữu bị mờ hoặc ảnh quét 360° có chất lượng kém..."
                className="w-full h-24 p-3 mt-3 text-xs border border-line rounded-lg focus:outline-none focus:border-accent bg-bg/25 resize-none"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowRejectDialog(false)
                    setRejectReason('')
                  }}
                  className="px-4 py-2 border border-line text-muted hover:text-fg text-xs font-semibold rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleReject(selectedProp.id)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
