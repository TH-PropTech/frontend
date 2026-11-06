'use client'

import { useState, type ChangeEvent, type ReactElement } from 'react'
import Image from 'next/image'
import { ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { LegalReferences, LEGAL_SOURCE_KEYS } from '@/entities/legal-source'
import { uploadEvidencePhotos } from '../api/move-out-api'
import type {
  DeductionLineInput,
  UtilitySuggestion,
} from '../api/move-out-types'
import {
  UTILITY_SUGGESTION_NOTES,
  formatMoney,
  getMoveOutErrorMessage,
} from '../lib/move-out-labels'
import { FIELD_CLASS } from './note-action'

export interface DeductionStatementEditorProps {
  depositAmount: number
  initialLines: DeductionLineInput[]
  busy: boolean
  onSave: (lines: DeductionLineInput[]) => void
  /** Lưu rồi gửi khách. */
  onSubmit: (lines: DeductionLineInput[]) => void
  /** Gợi ý khoản điện nước từ chỉ số công tơ; vắng thì ẩn nút gợi ý. */
  loadSuggestions?:
    | ((unpaidServiceMonths: number) => Promise<UtilitySuggestion>)
    | undefined
}

interface LineDraft {
  reason: string
  amount: string
  evidenceUrls: string[]
  source?: 'meter-suggestion'
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
    ...(line.source ? { source: line.source } : {}),
  }))

export function DeductionStatementEditor({
  depositAmount,
  initialLines,
  busy,
  onSave,
  onSubmit,
  loadSuggestions,
}: DeductionStatementEditorProps): ReactElement {
  const [lines, setLines] = useState<LineDraft[]>(
    initialLines.map(line => ({
      reason: line.reason,
      amount: String(line.amount),
      evidenceUrls: line.evidenceUrls ?? [],
      ...(line.source === 'meter-suggestion'
        ? { source: 'meter-suggestion' as const }
        : {}),
    }))
  )
  const [unpaidMonths, setUnpaidMonths] = useState('0')
  const [suggesting, setSuggesting] = useState(false)
  const [suggestNotes, setSuggestNotes] = useState<string[]>([])
  const [suggestError, setSuggestError] = useState<string | null>(null)
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

  const handleSuggest = async (): Promise<void> => {
    if (!loadSuggestions) return
    setSuggesting(true)
    setSuggestError(null)
    try {
      const result = await loadSuggestions(
        Math.max(0, Math.floor(Number(unpaidMonths) || 0))
      )
      // Gợi ý mới thay gợi ý cũ; khoản Chủ nhà tự nhập được giữ nguyên.
      setLines(current => [
        ...current.filter(line => line.source !== 'meter-suggestion'),
        ...result.lines.map(line => ({
          reason: line.reason,
          amount: String(line.amount),
          evidenceUrls: line.evidenceUrls,
          source: 'meter-suggestion' as const,
        })),
      ])
      setSuggestNotes(
        result.notes.map(code => UTILITY_SUGGESTION_NOTES[code] ?? code)
      )
    } catch (error) {
      setSuggestError(
        getMoveOutErrorMessage(error, 'Không tải được gợi ý. Vui lòng thử lại.')
      )
    } finally {
      setSuggesting(false)
    }
  }

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
      {loadSuggestions ? (
        <section
          data-testid="utility-suggestion"
          className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs"
        >
          <p className="font-semibold text-[var(--fg)]">
            Gợi ý khoản điện, nước và dịch vụ
          </p>
          <p className="text-[var(--muted)]">
            Hệ thống tính từ chỉ số công tơ ở biên bản nhận nhà và trả nhà, nhân
            với đơn giá trong hợp đồng. Bạn xem và sửa trước khi gửi khách; ảnh
            công tơ của hai biên bản được đính kèm làm chứng cứ.
          </p>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs">
              Số tháng phí dịch vụ chưa thu
              <input
                type="number"
                min="0"
                max="60"
                step="1"
                value={unpaidMonths}
                onChange={event => setUnpaidMonths(event.target.value)}
                className={FIELD_CLASS}
              />
            </label>
            <Button
              type="button"
              variant="secondary"
              className="min-h-11"
              disabled={busy || suggesting}
              onClick={() => void handleSuggest()}
            >
              {suggesting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : null}
              Gợi ý khoản điện nước từ chỉ số công tơ
            </Button>
          </div>
          {suggestNotes.map(message => (
            <p key={message} role="status" className="text-[var(--muted)]">
              {message}
            </p>
          ))}
          {suggestError ? (
            <p role="alert" className="text-[var(--danger)]">
              {suggestError}
            </p>
          ) : null}
          <LegalReferences sourceKeys={LEGAL_SOURCE_KEYS.utilities} />
        </section>
      ) : null}
      {lines.map((line, index) => (
        <div
          key={index}
          data-testid="deduction-line-editor"
          className="space-y-2 rounded-lg border border-[var(--border)] p-3"
        >
          {line.source === 'meter-suggestion' ? (
            <p className="text-[11px] font-semibold text-[var(--info)]">
              Gợi ý từ chỉ số công tơ
            </p>
          ) : null}
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
