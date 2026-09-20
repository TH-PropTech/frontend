'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import {
  MapPin,
  User,
  Banknote,
  LayoutGrid,
  BedDouble,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  X,
  ImageIcon,
  ScanLine,
  Pencil,
} from 'lucide-react'
import { ApartmentEditDialog } from './apartment-edit-dialog'
import { ImageGallery } from './image-gallery'
import { StatusBadge } from './status-badge'
import { STATUS_CONFIG, formatPrice } from './types'
import type { StaffApartment, ApartmentStatus } from './types'

interface DetailDrawerProps {
  apartment: StaffApartment
  onClose: () => void
  onStatusChange: (id: string, status: ApartmentStatus) => void
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, reason: string) => Promise<void>
  onMediaChange: (apartment: StaffApartment) => void
}

type MediaType = 'gallery' | 'images360'

export function DetailDrawer({
  apartment,
  onClose,
  onStatusChange,
  onApprove,
  onReject,
  onMediaChange,
}: DetailDrawerProps): React.ReactElement {
  const [mediaType, setMediaType] = React.useState<MediaType>('gallery')
  const [isUploading, setIsUploading] = React.useState(false)
  const [isActing, setIsActing] = React.useState(false)
  const [showRejectInput, setShowRejectInput] = React.useState(false)
  const [rejectReason, setRejectReason] = React.useState('')
  const [showEdit, setShowEdit] = React.useState(false)
  const [vrUrl, setVrUrl] = React.useState(apartment.vrUrl ?? '')
  const [isSavingVr, setIsSavingVr] = React.useState(false)

  const cfg = STATUS_CONFIG[apartment.status]
  const trimmedVrUrl = vrUrl.trim()
  const isVrUnchanged = trimmedVrUrl === (apartment.vrUrl ?? '')

  // Link VR Tour do nhân viên gắn sau khi chụp; chủ nhà không nhập.
  const handleSaveVr = async (): Promise<void> => {
    setIsSavingVr(true)
    try {
      const updated = await apiClient.patch<StaffApartment>(
        `/apartments/${apartment.id}/media`,
        { vrUrl: trimmedVrUrl }
      )
      onMediaChange(updated)
      toast.success('Đã lưu link VR Tour')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lưu link VR thất bại')
    } finally {
      setIsSavingVr(false)
    }
  }

  const handleUpload = async (files: FileList): Promise<void> => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach(f => formData.append('images', f))
      const res = await apiClient.post<{ urls: string[] }>(
        '/apartments/upload',
        formData
      )
      const updated = await apiClient.patch<StaffApartment>(
        `/apartments/${apartment.id}/media`,
        { [mediaType]: res.urls }
      )
      onMediaChange(updated)
      toast.success(
        `Đã thay thế ${res.urls.length} ${mediaType === 'gallery' ? 'ảnh thường' : 'ảnh 360°'} thành công!`
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload ảnh thất bại')
    } finally {
      setIsUploading(false)
    }
  }

  const handleToggleVisibility = async (): Promise<void> => {
    setIsActing(true)
    const newStatus: ApartmentStatus =
      apartment.status === 'unavailable' ? 'available' : 'unavailable'
    try {
      await apiClient.patch(`/apartments/${apartment.id}/status`, {
        status: newStatus,
      })
      onStatusChange(apartment.id, newStatus)
      toast.success(
        newStatus === 'unavailable'
          ? 'Đã ẩn bài đăng căn hộ.'
          : 'Đã mở lại bài đăng căn hộ.'
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Thao tác thất bại')
    } finally {
      setIsActing(false)
    }
  }

  const handleApprove = async (): Promise<void> => {
    setIsActing(true)
    try {
      await onApprove(apartment.id)
    } finally {
      setIsActing(false)
    }
  }

  const handleReject = async (): Promise<void> => {
    if (!rejectReason.trim()) return
    setIsActing(true)
    try {
      await onReject(apartment.id, rejectReason)
      setShowRejectInput(false)
      setRejectReason('')
    } finally {
      setIsActing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-[color:var(--fg)]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-5xl h-[90vh] bg-[color:var(--surface)] rounded-2xl border border-[color:var(--border)] shadow-[var(--shadow-lg)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* LEFT — Gallery */}
        <div className="w-full lg:w-[55%] flex flex-col min-h-0">
          <div className="grid grid-cols-2 gap-1 p-2 border-b border-[color:var(--border)] bg-[color:var(--surface)]">
            <button
              type="button"
              onClick={() => setMediaType('gallery')}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                mediaType === 'gallery'
                  ? 'bg-[color:var(--primary)] text-[color:var(--on-control)]'
                  : 'text-[color:var(--muted)] hover:bg-[color:var(--surface-muted)]'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Ảnh thường ({apartment.gallery.length})
            </button>
            <button
              type="button"
              onClick={() => setMediaType('images360')}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                mediaType === 'images360'
                  ? 'bg-[color:var(--primary)] text-[color:var(--on-control)]'
                  : 'text-[color:var(--muted)] hover:bg-[color:var(--surface-muted)]'
              }`}
            >
              <ScanLine className="h-3.5 w-3.5" />
              Ảnh 360° ({apartment.images360.length})
            </button>
          </div>
          <ImageGallery
            images={apartment[mediaType]}
            onUpload={handleUpload}
            isUploading={isUploading}
            emptyLabel={
              mediaType === 'gallery'
                ? 'Chưa có ảnh thường'
                : 'Chưa có ảnh 360°'
            }
            uploadLabel={
              mediaType === 'gallery'
                ? 'Tải ảnh thường để thay thế'
                : 'Tải ảnh 360° để thay thế'
            }
          />
        </div>

        {/* RIGHT — Info + Actions */}
        <div className="w-full lg:w-[45%] flex flex-col border-t lg:border-t-0 lg:border-l border-[color:var(--border)] overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[color:var(--border)] bg-[color:var(--surface-muted)]/20 flex items-start justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-[color:var(--primary)] font-mono">
                  #{apartment.id.slice(-8).toUpperCase()}
                </span>
                <StatusBadge status={apartment.status} />
              </div>
              <h2 className="text-sm font-bold text-[color:var(--fg)] mt-1 leading-snug line-clamp-2">
                {apartment.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="shrink-0 p-1.5 rounded-lg text-[color:var(--muted)] hover:bg-[color:var(--fg)]/5 hover:text-[color:var(--fg)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            <div className="flex items-start gap-2 text-xs text-[color:var(--muted)]">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[color:var(--primary)]" />
              <span>
                {apartment.location ||
                  `${apartment.district}, ${apartment.city}`}
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  icon: <Banknote className="w-3 h-3" />,
                  label: 'Giá thuê',
                  value: formatPrice(apartment.priceMonthly),
                },
                {
                  icon: <LayoutGrid className="w-3 h-3" />,
                  label: 'Diện tích',
                  value: `${apartment.area} m²`,
                },
                {
                  icon: <BedDouble className="w-3 h-3" />,
                  label: 'Phòng ngủ',
                  value: `${apartment.bedrooms} PN`,
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[color:var(--surface-muted)]/40 rounded-xl p-2.5 text-center"
                >
                  <div className="flex items-center justify-center gap-1 text-[color:var(--muted)] mb-1">
                    {icon}
                    <span className="text-[9px] font-medium uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[color:var(--fg)]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Landlord */}
            {apartment.landlord && (
              <div className="bg-[color:var(--surface-muted)]/30 rounded-xl p-3 border border-[color:var(--border)]">
                <h4 className="text-[10px] font-bold text-[color:var(--muted)] uppercase tracking-wider mb-2">
                  Chủ nhà
                </h4>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--primary-soft)] flex items-center justify-center text-[color:var(--primary)]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[color:var(--fg)]">
                      {apartment.landlord.fullName}
                    </p>
                    <p className="text-[10px] text-[color:var(--muted)]">
                      {apartment.landlord.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Status info */}
            <div
              className={`rounded-xl p-3 border text-xs ${cfg.bgClass} ${cfg.borderClass}`}
            >
              <span className={`font-semibold ${cfg.textClass}`}>
                {cfg.label}
              </span>
              {apartment.status === 'rejected' && apartment.rejectedReason && (
                <p className="text-[color:var(--danger)] text-[10px] mt-1">
                  Lý do: {apartment.rejectedReason}
                </p>
              )}
              {apartment.approvedAt && (
                <p className="text-[color:var(--muted)] text-[10px] mt-1">
                  Duyệt lúc:{' '}
                  {new Date(apartment.approvedAt).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>

            {/* VR Tour */}
            <div className="space-y-1.5">
              <label
                htmlFor="staff-vr-url"
                className="text-[10px] font-bold text-[color:var(--muted)] uppercase tracking-wider"
              >
                Link VR Tour
              </label>
              <div className="flex gap-2">
                <input
                  id="staff-vr-url"
                  value={vrUrl}
                  onChange={e => setVrUrl(e.target.value)}
                  placeholder="https://my.matterport.com/show/?m=..."
                  className="min-w-0 flex-1 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] p-2.5 text-xs focus:border-[color:var(--primary)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveVr}
                  disabled={isVrUnchanged || isSavingVr}
                  className="shrink-0 rounded-lg bg-[color:var(--primary)] px-3 text-xs font-semibold text-[color:var(--on-control)] hover:opacity-90 disabled:opacity-50"
                >
                  Lưu link VR
                </button>
              </div>
            </div>

            {/* Reject input */}
            {showRejectInput && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[color:var(--fg)] uppercase tracking-wider">
                  Lý do từ chối
                </label>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Nêu rõ lý do để chủ nhà chỉnh sửa lại..."
                  rows={3}
                  className="w-full p-2.5 text-xs border border-[color:var(--border)] rounded-lg resize-none bg-[color:var(--bg)] focus:outline-none focus:border-[color:var(--primary)] transition-colors"
                />
              </div>
            )}
          </div>

          {/* Actions Footer */}
          <div className="p-4 border-t border-[color:var(--border)] bg-[color:var(--surface-muted)]/20 shrink-0 space-y-2">
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl border border-[color:var(--border)] text-[color:var(--fg)] hover:bg-[color:var(--surface-muted)] transition-colors flex items-center justify-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              Chỉnh sửa thông tin
            </button>
            {apartment.status === 'pending' && !showRejectInput && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRejectInput(true)}
                  disabled={isActing}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-[color:var(--danger)]/40 text-[color:var(--danger)] hover:bg-[color:var(--danger-soft)] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Từ chối
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isActing}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[color:var(--success)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {isActing ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                  Phê duyệt
                </button>
              </div>
            )}

            {showRejectInput && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowRejectInput(false)
                    setRejectReason('')
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || isActing}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[color:var(--danger)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isActing ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  Xác nhận từ chối
                </button>
              </div>
            )}

            {(apartment.status === 'available' ||
              apartment.status === 'unavailable') && (
              <button
                onClick={handleToggleVisibility}
                disabled={isActing}
                className={`w-full py-2.5 text-xs font-semibold rounded-xl border transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 ${
                  apartment.status === 'unavailable'
                    ? 'border-[color:var(--success)]/40 text-[color:var(--success)] hover:bg-[color:var(--success-soft)]'
                    : 'border-[color:var(--border-strong)] text-[color:var(--muted)] hover:text-[color:var(--fg)] hover:bg-[color:var(--fg)]/5'
                }`}
              >
                {isActing ? (
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : apartment.status === 'unavailable' ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                {apartment.status === 'unavailable'
                  ? 'Mở lại bài đăng'
                  : 'Ẩn bài đăng'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showEdit && (
        <ApartmentEditDialog
          apartment={apartment}
          onClose={() => setShowEdit(false)}
          onSaved={updated => {
            onMediaChange(updated)
            setShowEdit(false)
          }}
        />
      )}
    </div>
  )
}
