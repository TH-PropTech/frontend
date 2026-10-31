'use client'

import * as React from 'react'
import { KycComparisonModal } from './components/kyc-comparison-modal'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
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
import { formatRecordCode } from '../../model/admin-labels'

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
  const [isSearching, setIsSearching] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedRecord, setSelectedRecord] = React.useState<KycRecord | null>(
    null
  )
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 250)
    return () => clearTimeout(timer)
  }, [search])

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
      email: k.user?.email || 'Chưa cập nhật',
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
    setIsSearching(true)
    setError(null)
    try {
      const query = new URLSearchParams({ limit: '100' })
      if (debouncedSearch.trim()) query.set('search', debouncedSearch.trim())
      const data = await apiClient.get<BackendKycListResult>(
        `/kyc?${query.toString()}`
      )
      if (data && data.items) {
        setRecords(data.items.map(mapKycRecord))
      }
    } catch (err) {
      console.error('Failed to load KYC records:', err)
      const msg =
        err instanceof Error ? err.message : 'Không thể tải danh sách hồ sơ KYC'
      setError(msg)
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }, [mapKycRecord, debouncedSearch])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadRecords()
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
    const trimmed = rejectReason.trim()
    if (!trimmed) return
    try {
      await apiClient.patch(`/kyc/${id}/review`, {
        status: 'rejected',
        rejectedReason: trimmed,
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
            className="min-w-52 bg-transparent text-fg outline-none placeholder:text-muted"
          />
          {isSearching && (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </label>
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
            Chờ duyệt ({records.filter(r => r.status === 'pending').length})
          </button>
          <button
            type="button"
            aria-pressed={filter === 'approved'}
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã xác minh
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

      {loading && !records.length ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : error && !records.length ? (
        <AdminErrorState
          title="Lỗi tải hồ sơ KYC"
          message={error}
          onRetry={() => void loadRecords()}
        />
      ) : (
        <>
          {/* Mobile Card View (screens < md) */}
          <div className="space-y-3 md:hidden">
            {filteredRecords.map(record => (
              <AdminCard key={record.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-fg">
                    {formatRecordCode(record.id)}
                  </span>
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
                        : 'Chờ duyệt'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-fg">{record.name}</p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    CCCD: {record.cccdNumber}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-subtle border-t border-line/60 pt-2">
                  <span>
                    Khớp OCR:{' '}
                    <strong className="text-fg font-semibold">
                      {record.ocrScore === null
                        ? 'Chưa có'
                        : `${record.ocrScore}%`}
                    </strong>
                  </span>
                  <span>{record.submittedAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(record)}
                  className="w-full min-h-11 py-2 bg-fg/5 hover:bg-fg/10 text-fg rounded-lg text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                >
                  {canApprove ? 'Đối chiếu & Duyệt' : 'Xem hồ sơ'}
                </button>
              </AdminCard>
            ))}
            {filteredRecords.length === 0 && (
              <AdminCard className="p-8 text-center text-muted font-medium text-xs">
                Chưa có hồ sơ nào trong mục này.
              </AdminCard>
            )}
          </div>

          {/* Records table (screens >= md) */}
          <AdminCard
            className={`overflow-hidden hidden md:block transition-opacity duration-200 ${isSearching ? 'opacity-60' : 'opacity-100'}`}
          >
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
                        {formatRecordCode(record.id)}
                      </td>
                      <td className="p-4 font-semibold text-fg">
                        {record.name}
                      </td>
                      <td className="p-4 font-mono">{record.cccdNumber}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-fg">
                            {record.ocrScore === null
                              ? 'Chưa có'
                              : `${record.ocrScore}%`}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted">{record.submittedAt}</td>
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
                              : 'Chờ duyệt'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(record)}
                          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg transition-colors cursor-pointer"
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
                        className="p-8 text-center text-muted font-medium"
                      >
                        Chưa có hồ sơ nào trong mục này.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </>
      )}

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
      <Dialog
        open={showRejectDialog && !!selectedRecord}
        onOpenChange={open => {
          if (!open) {
            setShowRejectDialog(false)
            setRejectReason('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lý do từ chối hồ sơ KYC</DialogTitle>
            <DialogDescription>
              Nêu rõ lý do để người dùng chụp lại tài liệu rõ ràng hơn.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Ví dụ: Ảnh mặt sau của thẻ CCCD bị lóa sáng mất phần mã MRZ..."
              rows={4}
              className="resize-none text-xs"
            />
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
                if (selectedRecord) void handleReject(selectedRecord.id)
              }}
              disabled={!rejectReason.trim()}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
