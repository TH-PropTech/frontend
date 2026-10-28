'use client'

import { useState, type ChangeEvent, type ReactElement } from 'react'
import Image from 'next/image'
import { ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { uploadEvidencePhotos } from '../api/move-out-api'
import type { DeductionLineInput } from '../api/move-out-types'
import { formatMoney, getMoveOutErrorMessage } from '../lib/move-out-labels'
import { FIELD_CLASS } from './note-action'

export interface DeductionStatementEditorProps {
  depositAmount: number
  initialLines: DeductionLineInput[]
  busy: boolean
  onSave: (lines: DeductionLineInput[]) => void
  /** Lưu rồi gửi khách. */
  onSubmit: (lines: DeductionLineInput[]) => void
}

interface LineDraft {
  reason: string
  amount: string
  evidenceUrls: string[]
}

const MAX_LINES = 50
const MAX_PHOTOS = 5
const MAX_PHOTO_BYTES = 5 * 1024 * 1024
const PHOTO_TYPES = ['image/jpeg', 'image/png']

const toInputs = (drafts: LineDraft[]): DeductionLineInput[] =>
  drafts.map(line => ({
    reason: line.reason.trim(),
    amount: Number(line.amount),
    ...(line.evidenceUrls.length > 0
      ? { evidenceUrls: line.evidenceUrls }
      : {}),
  }))

export function DeductionStatementEditor({
  depositAmount,
  initialLines,
  busy,
  onSave,
  onSubmit,
}: DeductionStatementEditorProps): ReactElement {
  const [lines, setLines] = useState<LineDraft[]>(
    initialLines.map(line => ({
      reason: line.reason,
      amount: String(line.amount),
      evidenceUrls: line.evidenceUrls ?? [],
    }))
  )
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const total = lines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0)
  const exceeds = total > depositAmount
  const incomplete = lines.some(
    line => !line.reason.trim() || !(Number(line.amount) >= 1)
  )
  const blocked = busy || exceeds || incomplete || uploadingIndex !== null

  const updateLine = (index: number, patch: Partial<LineDraft>): void =>
    setLines(current =>
      current.map((line, i) => (i === index ? { ...line, ...patch } : line))
    )

  const handlePhotos = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    const current = lines[index]?.evidenceUrls ?? []
    if (files.length === 0) return
    if (current.length + files.length > MAX_PHOTOS) {
      setUploadError(`Mỗi khoản chỉ đính kèm tối đa ${MAX_PHOTOS} ảnh.`)
      return
    }
    if (
      files.some(f => !PHOTO_TYPES.includes(f.type) || f.size > MAX_PHOTO_BYTES)
    ) {
      setUploadError('Chỉ nhận ảnh JPG hoặc PNG, mỗi ảnh tối đa 5 MB.')
      return
    }
    setUploadError(null)
    setUploadingIndex(index)
    try {
      const urls = await uploadEvidencePhotos(files)
      updateLine(index, { evidenceUrls: [...current, ...urls] })
    } catch (error) {
      setUploadError(getMoveOutErrorMessage(error, 'Không tải được ảnh lên.'))
    } finally {
      setUploadingIndex(null)
    }
  }

  return (
    <div className="space-y-3" data-testid="deduction-editor">
      <p className="text-xs text-[var(--muted)]">
        Tiền cọc: <strong>{formatMoney(depositAmount)}</strong>. Mỗi khoản khấu
        trừ cần có lý do; nên kèm ảnh chứng từ. Nếu không khấu trừ khoản nào,
        hãy chốt bảng trống.
      </p>
      {lines.map((line, index) => (
        <div
          key={index}
          data-testid="deduction-line-editor"
          className="space-y-2 rounded-lg border border-[var(--border)] p-3"
        >
          <div className="grid gap-2 sm:grid-cols-[3fr_1fr_auto]">
            <label className="text-xs">
              Lý do khấu trừ
              <input
                required
                maxLength={500}
                value={line.reason}
                onChange={event =>
                  updateLine(index, { reason: event.target.value })
                }
                className={FIELD_CLASS}
              />
            </label>
            <label className="text-xs">
              Số tiền (đ)
              <input
                required
                type="number"
                min="1"
                step="1"
                value={line.amount}
                onChange={event =>
                  updateLine(index, { amount: event.target.value })
                }
                className={FIELD_CLASS}
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Xóa khoản ${index + 1}`}
              className="min-h-11 self-end"
              onClick={() =>
                setLines(current => current.filter((_, i) => i !== index))
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {line.evidenceUrls.map(url => (
              <span key={url} className="relative">
                <Image
                  src={url}
                  alt="Ảnh chứng từ khoản khấu trừ"
                  width={56}
                  height={56}
                  unoptimized
                  className="h-14 w-14 rounded-md border border-[var(--border)] object-cover"
                />
                <button
                  type="button"
                  aria-label="Bỏ ảnh này"
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--danger)] text-[11px] text-white"
                  onClick={() =>
                    updateLine(index, {
                      evidenceUrls: line.evidenceUrls.filter(u => u !== url),
                    })
                  }
                >
                  ×
                </button>
              </span>
            ))}
            {line.evidenceUrls.length < MAX_PHOTOS ? (
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-lg border border-dashed border-[var(--border-strong)] px-3 text-xs font-semibold text-[var(--fg)]">
                {uploadingIndex === index ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <ImagePlus className="h-4 w-4" aria-hidden="true" />
                )}
                Thêm ảnh chứng từ
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  className="sr-only"
                  data-testid={`evidence-input-${index}`}
                  onChange={event => void handlePhotos(index, event)}
                />
              </label>
            ) : null}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        className="min-h-11"
        disabled={lines.length >= MAX_LINES}
        onClick={() =>
          setLines(current => [
            ...current,
            { reason: '', amount: '', evidenceUrls: [] },
          ])
        }
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Thêm khoản khấu trừ
      </Button>
      <p
        role={exceeds ? 'alert' : undefined}
        className={`text-xs font-semibold ${exceeds ? 'text-[var(--danger)]' : 'text-[var(--fg)]'}`}
      >
        Tổng khấu trừ: {formatMoney(total)} · Cọc hoàn dự kiến:{' '}
        {formatMoney(Math.max(0, depositAmount - total))}
        {exceeds ? ' (vượt quá tiền cọc, hãy giảm bớt)' : ''}
      </p>
      {uploadError ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          {uploadError}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={blocked || lines.length === 0}
          onClick={() => onSave(toInputs(lines))}
        >
          Lưu nháp
        </Button>
        <Button
          type="button"
          className="min-h-11"
          disabled={blocked}
          onClick={() => onSubmit(toInputs(lines))}
        >
          {lines.length === 0 ? 'Chốt: không khấu trừ' : 'Chốt và gửi khách'}
        </Button>
      </div>
    </div>
  )
}
