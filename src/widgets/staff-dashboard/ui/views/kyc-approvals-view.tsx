'use client'

import * as React from 'react'
import { KycComparisonModal } from './components/kyc-comparison-modal'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { AdminCard } from '@/shared/ui/admin-card'
import { useCan } from '@/shared/lib/permissions'

export interface KycRecord {
  id: string
  name: string
  email: string
  cccdNumber: string
  dob: string
  gender: string
  hometown: string
  address: string
  ocrScore: number | null
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface BackendKycResponse {
  _id: string
  userId: string
  idCardNumber: string
  frontCardUrl: string
  backCardUrl: string
  selfieUrl: string
  fullName?: string
  dateOfBirth?: string
  gender?: string
  placeOfOrigin?: string
  placeOfResidence?: string
  ocrMatchRate?: number
  status: 'pending' | 'verified' | 'rejected'
  createdAt: string
  user?: {
    email: string
    phone: string
  } | null
}

interface BackendKycListResult {
  items: BackendKycResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function KycApprovalsView(): React.ReactElement {
  const can = useCan()
  const canApprove = can('approve', 'Kyc')
  const [records, setRecords] = React.useState<KycRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedRecord, setSelectedRecord] = React.useState<KycRecord | null>(
    null
  )
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  const mapKycRecord = React.useCallback((k: BackendKycResponse): KycRecord => {
    let mappedStatus: 'pending' | 'approved' | 'rejected' = 'pending'
    if (k.status === 'verified') {
      mappedStatus = 'approved'
    } else if (k.status === 'rejected') {
      mappedStatus = 'rejected'
    }

    return {
      id: k._id || '',
      name: k.fullName || 'Chưa cập nhật',
      email: k.user?.email || 'N/A',
      cccdNumber: k.idCardNumber || '',
      dob: k.dateOfBirth || '',
      gender: k.gender || '',
      hometown: k.placeOfOrigin || '',
      address: k.placeOfResidence || '',
      ocrScore: k.ocrMatchRate ?? null,
      submittedAt: k.createdAt
        ? new Date(k.createdAt).toLocaleString('vi-VN')
        : '',
      status: mappedStatus,
    }
  }, [])

  const loadRecords = React.useCallback(async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({ limit: '100' })
      if (search.trim()) query.set('search', search.trim())
      const data = await apiClient.get<BackendKycListResult>(
        `/kyc?${query.toString()}`
      )
      if (data && data.items) {
        setRecords(data.items.map(mapKycRecord))
      }
    } catch (err) {
      console.error('Failed to load KYC records:', err)
    } finally {
      setLoading(false)
    }
  }, [mapKycRecord, search])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRecords()
  }, [loadRecords])

  const handleVerify = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/kyc/${id}/review`, { status: 'verified' })
      setRecords(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'approved' } : r))
      )
      setSelectedRecord(null)
      toast.success('Đã phê duyệt hồ sơ KYC thành công!')
    } catch (err) {
      console.error('Failed to verify KYC:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể xác nhận KYC. Vui lòng thử lại.'
      toast.error(message)
    }
  }

  const handleReject = async (id: string): Promise<void> => {
    if (!rejectReason.trim()) return
    try {
      await apiClient.patch(`/kyc/${id}/review`, {
        status: 'rejected',
        rejectedReason: rejectReason,
      })
      setRecords(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'rejected' } : r))
      )
      setShowRejectDialog(false)
      setSelectedRecord(null)
      setRejectReason('')
      toast.info('Đã từ chối hồ sơ KYC.')
    } catch (err) {
      console.error('Failed to reject KYC:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể từ chối KYC. Vui lòng thử lại.'
      toast.error(message)
    }
  }
  const filteredRecords = records.filter(
    r => filter === 'all' || r.status === filter
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
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">
            Xác minh danh tính (KYC)
          </h2>
          <p className="text-xs text-muted mt-1">
            Đối chiếu ảnh chụp thẻ CCCD của người dùng với kết quả trích xuất tự
            động từ hệ thống OCR.
          </p>
        </div>
        <label className="flex items-center gap-2 self-start rounded-lg border border-line bg-surface px-3 py-2 text-xs text-muted">
          <span className="sr-only">Tìm kiếm hồ sơ KYC</span>
          <input
            id="kyc-search"
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Tìm theo tên hoặc số CCCD"
            className="min-w-52 bg-transparent text-fg outline-none placeholder:text-subtle"
          />
        </label>
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
            Chờ duyệt ({records.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã xác minh
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Records table */}
      <AdminCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-muted/30 border-b border-line text-muted uppercase tracking-wider font-semibold font-body">
                <th className="p-4">Mã hồ sơ</th>
                <th className="p-4">Họ và tên</th>
                <th className="p-4">Số CCCD</th>
                <th className="p-4">Tỷ lệ khớp OCR</th>
                <th className="p-4">Ngày gửi</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filteredRecords.map(record => (
                <tr
                  key={record.id}
                  className="hover:bg-bg/10 transition-colors"
                >
                  <td className="p-4 font-mono font-bold text-fg">
                    {record.id}
                  </td>
                  <td className="p-4 font-semibold text-fg">{record.name}</td>
                  <td className="p-4 font-mono">{record.cccdNumber}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-fg">
                        {record.ocrScore === null
                          ? 'Không có dữ liệu'
                          : `${record.ocrScore}%`}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-subtle">{record.submittedAt}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        record.status === 'approved'
                          ? 'bg-accent-2/10 text-accent-2'
                          : record.status === 'rejected'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-accent-3/10 text-accent-3'
                      }`}
                    >
                      {record.status === 'approved'
                        ? 'Đã duyệt'
                        : record.status === 'rejected'
                          ? 'Đã từ chối'
                          : 'Đang chờ'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="px-3 py-1.5 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors"
                    >
                      {canApprove ? 'Đối chiếu & Duyệt' : 'Xem hồ sơ'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-subtle font-body"
                  >
                    Không có hồ sơ KYC nào phù hợp với bộ lọc này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Side-by-Side Comparison Workspace Modal */}
      {selectedRecord && (
        <KycComparisonModal
          selectedRecord={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onVerify={handleVerify}
          onShowReject={() => setShowRejectDialog(true)}
          canReview={canApprove}
        />
      )}

      {/* Reject Reason input dialog */}
      {showRejectDialog && selectedRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-fg/50 backdrop-blur-sm"
            onClick={() => setShowRejectDialog(false)}
          />
          <AdminCard className="relative z-10 w-full max-w-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">
                Lý do từ chối hồ sơ KYC
              </h3>
              <p className="text-xs text-muted mt-1">
                Nêu rõ lý do để người dùng chụp lại tài liệu rõ ràng hơn.
              </p>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Ảnh mặt sau của thẻ CCCD bị lóa sáng mất phần mã MRZ..."
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
                  onClick={() => handleReject(selectedRecord.id)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      )}
    </div>
  )
}
