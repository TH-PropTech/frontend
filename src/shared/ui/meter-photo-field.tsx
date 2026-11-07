'use client'

import * as React from 'react'
import { Camera, Loader2, X } from 'lucide-react'
import { uploadImages } from '@/shared/api/upload-images'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']
const MAX_BYTES = 5 * 1024 * 1024

export interface MeterPhotoFieldProps {
  id: string
  label: string
  urls: string[]
  onChange: (urls: string[]) => void
  max?: number
  disabled?: boolean
  /** Thông báo lỗi từ form (ví dụ chưa có ảnh). */
  error?: string | null | undefined
  upload?: (files: File[]) => Promise<string[]>
}

function validateFiles(files: File[], room: number): string | null {
  if (files.length > room) return `Tối đa ${room} ảnh nữa cho mục này.`
  if (files.some(file => !ACCEPTED_TYPES.includes(file.type))) {
    return 'Chỉ nhận ảnh JPEG hoặc PNG.'
  }
  if (files.some(file => file.size > MAX_BYTES)) {
    return 'Mỗi ảnh tối đa 5 MB.'
  }
  return null
}

export interface MeterPhotos {
  electricity: string[]
  water: string[]
}

export type MeterPhotoErrors = Partial<
  Record<keyof MeterPhotos, string | undefined>
>

/** Biên bản bàn giao bắt buộc có ít nhất một ảnh mỗi loại công tơ. */
export function getMissingMeterPhotoErrors(
  photos: MeterPhotos
): MeterPhotoErrors {
  return {
    ...(photos.electricity.length === 0
      ? { electricity: 'Vui lòng tải ít nhất một ảnh công tơ điện.' }
      : {}),
    ...(photos.water.length === 0
      ? { water: 'Vui lòng tải ít nhất một ảnh công tơ nước.' }
      : {}),
  }
}

/** Chọn, tải lên và xem trước ảnh công tơ; giữ lại các ảnh hợp lệ khi một lần tải lỗi. */
export function MeterPhotoField({
  id,
  label,
  urls,
  onChange,
  max = 3,
  disabled = false,
  error,
  upload = uploadImages,
}: MeterPhotoFieldProps): React.ReactElement {
  const [busy, setBusy] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)
  const shown = localError ?? error ?? null

  const handleFiles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return
    const invalid = validateFiles(files, max - urls.length)
    if (invalid) {
      setLocalError(invalid)
      return
    }
    setBusy(true)
    setLocalError(null)
    try {
      const uploaded = await upload(files)
      onChange([...urls, ...uploaded])
    } catch {
      setLocalError('Không tải được ảnh. Vui lòng thử lại.')
    } finally {
      setBusy(false)
    }
  }

  const removeAt = (index: number): void => {
    onChange(urls.filter((_, position) => position !== index))
  }

  return (
    <div className="space-y-2" data-testid={`${id}-field`}>
      <p className="text-sm font-medium text-fg">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {urls.map((url, index) => (
          <li
            key={url}
            className="relative h-20 w-20 overflow-hidden rounded-md border border-border"
          >
            <img
              src={url}
              alt={`${label} ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              disabled={disabled || busy}
              onClick={() => removeAt(index)}
              aria-label={`Xóa ${label.toLowerCase()} ${index + 1}`}
              className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-fg shadow"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </li>
        ))}
        {urls.length < max ? (
          <li>
            <label
              htmlFor={id}
              className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border text-xs text-muted ${disabled || busy ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {busy ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <Camera className="h-5 w-5" aria-hidden="true" />
              )}
              <span>{busy ? 'Đang tải' : 'Thêm ảnh'}</span>
            </label>
            <input
              id={id}
              type="file"
              accept="image/jpeg,image/png"
              capture="environment"
              multiple
              disabled={disabled || busy}
              onChange={event => void handleFiles(event)}
              className="sr-only"
              aria-label={`Chọn ${label.toLowerCase()}`}
            />
          </li>
        ) : null}
      </ul>
      <p className="text-xs text-muted">
        JPEG hoặc PNG, tối đa 5 MB mỗi ảnh, tối đa {max} ảnh.
      </p>
      {shown ? (
        <p role="alert" className="text-xs text-danger">
          {shown}
        </p>
      ) : null}
    </div>
  )
}
