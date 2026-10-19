'use client'

import * as React from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { uploadApartmentImages } from '@/features/apartment-posting/api/apartment-posting-api'

const MAX_FILES = 10
const MAX_BYTES = 5 * 1024 * 1024

export function AttachmentThumbs({
  urls,
}: {
  urls: string[]
}): React.ReactElement | null {
  if (urls.length === 0) return null
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {urls.map(url => (
        <li key={url}>
          <a href={url} target="_blank" rel="noreferrer">
            <img
              src={url}
              alt="Ảnh đính kèm"
              className="h-16 w-16 rounded-lg border border-border object-cover"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

interface AttachmentPickerProps {
  value: string[]
  onChange: (urls: string[]) => void
  disabled?: boolean
}

export function AttachmentPicker({
  value,
  onChange,
  disabled = false,
}: AttachmentPickerProps): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleFiles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return
    if (value.length + files.length > MAX_FILES) {
      setError(`Chỉ được đính kèm tối đa ${MAX_FILES} ảnh.`)
      return
    }
    if (files.some(file => !file.type.startsWith('image/'))) {
      setError('Chỉ chấp nhận tệp hình ảnh.')
      return
    }
    if (files.some(file => file.size > MAX_BYTES)) {
      setError('Mỗi ảnh tối đa 5MB.')
      return
    }
    setError(null)
    setUploading(true)
    try {
      const urls = await uploadApartmentImages(files)
      onChange([...value, ...urls])
    } catch {
      setError('Tải ảnh lên thất bại. Vui lòng thử lại.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {value.length > 0 ? (
        <ul className="mb-2 flex flex-wrap gap-2">
          {value.map(url => (
            <li key={url} className="relative">
              <img
                src={url}
                alt="Ảnh đính kèm"
                className="h-16 w-16 rounded-lg border border-border object-cover"
              />
              <button
                type="button"
                aria-label="Xóa ảnh đính kèm"
                onClick={() => onChange(value.filter(item => item !== url))}
                className="absolute -right-1.5 -top-1.5 rounded-full bg-fg p-0.5 text-white"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        aria-label="Chọn ảnh đính kèm"
        onChange={event => void handleFiles(event)}
      />
      <button
        type="button"
        disabled={disabled || uploading || value.length >= MAX_FILES}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg hover:bg-surface-muted disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {uploading ? 'Đang tải ảnh...' : 'Đính kèm ảnh (tối đa 10, 5MB/ảnh)'}
      </button>
      {error ? (
        <p role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
