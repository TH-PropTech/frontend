'use client'

import * as React from 'react'
import { AlertCircle, Plus, Trash2 } from 'lucide-react'
import {
  LEGAL_SOURCE_ICONS,
  isHttpsUrl,
  type LegalSource,
  type LegalSourceIcon,
  type LegalSourceInput,
  type LegalSourceKind,
} from '@/features/contracts'

export type LegalSourceFormValues = LegalSourceInput & { key: string }

const KEY_PATTERN = /^[a-z0-9][a-z0-9.-]{1,63}$/

const ICON_LABELS: Record<LegalSourceIcon, string> = {
  residence: 'Cư trú',
  tax: 'Thuế',
  law: 'Luật',
  decree: 'Nghị định',
  fire: 'PCCC',
  building: 'Tòa nhà',
  digital: 'Pháp lý số',
}

const EMPTY_VALUES: LegalSourceFormValues = {
  key: '',
  kind: 'procedure',
  code: '',
  title: '',
  subtitle: '',
  agency: '',
  duration: '',
  fee: '',
  externalUrl: 'https://',
  icon: 'law',
  description: '',
  dossierItems: [],
  steps: [],
  legalGrounds: [],
  notes: [],
  showInContractPanel: false,
  isActive: true,
}

function toFormValues(source: LegalSource): LegalSourceFormValues {
  return {
    key: source.key,
    kind: source.kind,
    code: source.code,
    title: source.title,
    subtitle: source.subtitle,
    agency: source.agency,
    duration: source.duration,
    fee: source.fee,
    externalUrl: source.externalUrl,
    icon: source.icon,
    description: source.description,
    dossierItems: source.dossierItems,
    steps: source.steps,
    legalGrounds: source.legalGrounds,
    notes: source.notes,
    showInContractPanel: source.showInContractPanel,
    isActive: source.isActive,
  }
}

/** Kiểm tra phía client khớp với DTO backend; trả về danh sách lỗi */
export function validateLegalSource(
  values: LegalSourceFormValues,
  isCreate: boolean
): string[] {
  const errors: string[] = []
  if (isCreate && !KEY_PATTERN.test(values.key)) {
    errors.push(
      'Key chỉ gồm chữ thường, số, "." và "-" (2–64 ký tự), ví dụ 1.004194 hoặc housing-law-2023.'
    )
  }
  if (isCreate && values.key === 'admin') {
    errors.push('Key "admin" là từ khoá dành riêng.')
  }
  if (!values.code.trim() || !values.title.trim()) {
    errors.push('Vui lòng nhập Mã hiệu và Tiêu đề.')
  }
  if (!isHttpsUrl(values.externalUrl)) {
    errors.push('Link gốc phải là URL đầy đủ bắt đầu bằng https://')
  }
  values.legalGrounds.forEach((g, i) => {
    if (g.url && !isHttpsUrl(g.url)) {
      errors.push(`Căn cứ #${i + 1}: URL phải bắt đầu bằng https://`)
    }
  })
  return errors
}

/** Chuẩn hoá trước khi gửi: bỏ dòng trống, đánh số bước, bỏ url rỗng */
function normalize(values: LegalSourceFormValues): LegalSourceFormValues {
  return {
    ...values,
    key: values.key.trim(),
    code: values.code.trim(),
    title: values.title.trim(),
    externalUrl: values.externalUrl.trim(),
    dossierItems: values.dossierItems.filter(d => d.title.trim()),
    steps: values.steps
      .filter(s => s.title.trim())
      .map((s, i) => ({ ...s, step: i + 1 })),
    legalGrounds: values.legalGrounds
      .filter(g => g.title.trim())
      .map(g =>
        g.url?.trim()
          ? { title: g.title, article: g.article, url: g.url.trim() }
          : { title: g.title, article: g.article }
      ),
    notes: values.notes.filter(n => n.trim()),
  }
}

const INPUT_CLASS =
  'w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <label className="block space-y-1">
      <span className="font-semibold text-[var(--fg)]">{label}</span>
      {children}
    </label>
  )
}

interface RowListProps<T> {
  label: string
  rows: T[]
  empty: T
  onChange: (rows: T[]) => void
  /** `replace` thay toàn bộ dòng bằng giá trị mới */
  renderRow: (row: T, replace: (next: T) => void) => React.ReactNode
}

function RowList<T>({
  label,
  rows,
  empty,
  onChange,
  renderRow,
}: RowListProps<T>): React.ReactElement {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[var(--fg)]">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...rows, empty])}
          aria-label={`Thêm dòng ${label}`}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--primary)] hover:underline"
        >
          <Plus className="w-3 h-3" />
          Thêm dòng
        </button>
      </div>
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]"
        >
          <span className="text-[11px] font-mono text-[var(--muted)] mt-2">
            #{idx + 1}
          </span>
          <div className="flex-1 space-y-1">
            {renderRow(row, next =>
              onChange(rows.map((r, i) => (i === idx ? next : r)))
            )}
          </div>
          <button
            type="button"
            aria-label={`Xoá dòng ${idx + 1} của ${label}`}
            onClick={() => onChange(rows.filter((_, i) => i !== idx))}
            className="p-1.5 text-[var(--muted)] hover:text-[var(--danger)] rounded mt-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export interface LegalSourceFormProps {
  /** `null` = tạo mới */
  initial: LegalSource | null
  isSaving: boolean
  serverError: string | null
  onSubmit: (values: LegalSourceFormValues) => void
  onCancel: () => void
}

export function LegalSourceForm({
  initial,
  isSaving,
  serverError,
  onSubmit,
  onCancel,
}: LegalSourceFormProps): React.ReactElement {
  const isCreate = initial === null
  const [values, setValues] = React.useState<LegalSourceFormValues>(() =>
    initial ? toFormValues(initial) : EMPTY_VALUES
  )
  const [errors, setErrors] = React.useState<string[]>([])

  const set = <K extends keyof LegalSourceFormValues>(
    key: K,
    value: LegalSourceFormValues[K]
  ) => setValues(v => ({ ...v, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = normalize(values)
    const found = validateLegalSource(normalized, isCreate)
    setErrors(found)
    if (found.length === 0) onSubmit(normalized)
  }

  const shownErrors = serverError ? [...errors, serverError] : errors

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-testid="legal-source-form"
      className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
    >
      {shownErrors.length > 0 && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-[var(--danger)] flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <ul className="space-y-0.5">
            {shownErrors.map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Key (định danh cố định)">
          <input
            value={values.key}
            onChange={e => set('key', e.target.value)}
            disabled={!isCreate}
            placeholder="VD: residence-law-2020"
            className={`${INPUT_CLASS} font-mono disabled:opacity-60`}
          />
        </Field>
        <Field label="Loại nguồn">
          <select
            value={values.kind}
            onChange={e => set('kind', e.target.value as LegalSourceKind)}
            className={INPUT_CLASS}
          >
            <option value="procedure">Thủ tục DVC</option>
            <option value="legal_text">Văn bản pháp lý</option>
          </select>
        </Field>
        <Field label="Biểu tượng">
          <select
            value={values.icon}
            onChange={e => set('icon', e.target.value as LegalSourceIcon)}
            className={INPUT_CLASS}
          >
            {LEGAL_SOURCE_ICONS.map(icon => (
              <option key={icon} value={icon}>
                {ICON_LABELS[icon]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Mã hiệu">
          <input
            value={values.code}
            onChange={e => set('code', e.target.value)}
            placeholder="VD: TTHC 1.004194"
            className={`${INPUT_CLASS} font-mono`}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Tiêu đề">
            <input
              value={values.title}
              onChange={e => set('title', e.target.value)}
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <Field label="Mô tả phụ">
        <input
          value={values.subtitle}
          onChange={e => set('subtitle', e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="Link gốc (https://)">
        <input
          type="url"
          value={values.externalUrl}
          onChange={e => set('externalUrl', e.target.value)}
          className={`${INPUT_CLASS} font-mono`}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Cơ quan tiếp nhận / ban hành">
          <input
            value={values.agency}
            onChange={e => set('agency', e.target.value)}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Thời hạn / hiệu lực">
          <input
            value={values.duration}
            onChange={e => set('duration', e.target.value)}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Lệ phí">
          <input
            value={values.fee}
            onChange={e => set('fee', e.target.value)}
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <Field label="Tổng quan nghiệp vụ">
        <textarea
          rows={3}
          value={values.description}
          onChange={e => set('description', e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <RowList
        label="Thành phần hồ sơ"
        rows={values.dossierItems}
        empty={{ title: '', detail: '' }}
        onChange={rows => set('dossierItems', rows)}
        renderRow={(row, replace) => (
          <>
            <input
              value={row.title}
              onChange={e => replace({ ...row, title: e.target.value })}
              placeholder="Tên giấy tờ"
              className={INPUT_CLASS}
            />
            <input
              value={row.detail}
              onChange={e => replace({ ...row, detail: e.target.value })}
              placeholder="Chi tiết"
              className={INPUT_CLASS}
            />
            <label className="inline-flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={row.isPropTechExport ?? false}
                onChange={e =>
                  replace({ ...row, isPropTechExport: e.target.checked })
                }
              />
              Có sẵn từ TH-PropTech
            </label>
          </>
        )}
      />

      <RowList
        label="Trình tự các bước"
        rows={values.steps}
        empty={{ step: values.steps.length + 1, title: '', detail: '' }}
        onChange={rows => set('steps', rows)}
        renderRow={(row, replace) => (
          <>
            <input
              value={row.title}
              onChange={e => replace({ ...row, title: e.target.value })}
              placeholder="Tên bước"
              className={INPUT_CLASS}
            />
            <input
              value={row.detail}
              onChange={e => replace({ ...row, detail: e.target.value })}
              placeholder="Chi tiết"
              className={INPUT_CLASS}
            />
          </>
        )}
      />

      <RowList
        label="Căn cứ pháp lý"
        rows={values.legalGrounds}
        empty={{ title: '', article: '' }}
        onChange={rows => set('legalGrounds', rows)}
        renderRow={(row, replace) => (
          <>
            <input
              value={row.title}
              onChange={e => replace({ ...row, title: e.target.value })}
              placeholder="Tên văn bản"
              className={INPUT_CLASS}
            />
            <input
              value={row.article}
              onChange={e => replace({ ...row, article: e.target.value })}
              placeholder="Điều / khoản"
              className={INPUT_CLASS}
            />
            <input
              value={row.url ?? ''}
              onChange={e => replace({ ...row, url: e.target.value })}
              placeholder="https://... (không bắt buộc)"
              className={`${INPUT_CLASS} font-mono`}
            />
          </>
        )}
      />

      <RowList
        label="Lưu ý"
        rows={values.notes}
        empty=""
        onChange={rows => set('notes', rows)}
        renderRow={(row, replace) => (
          <input
            value={row}
            onChange={e => replace(e.target.value)}
            className={INPUT_CLASS}
          />
        )}
      />

      <div className="flex flex-wrap gap-4 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]">
        <label className="inline-flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={values.showInContractPanel ?? false}
            onChange={e => set('showInContractPanel', e.target.checked)}
          />
          Hiển thị trên panel hợp đồng
        </label>
        <label className="inline-flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={values.isActive ?? true}
            onChange={e => set('isActive', e.target.checked)}
          />
          Đang hiệu lực
        </label>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--fg)] hover:bg-[var(--surface-muted)]"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSaving}
          data-testid="btn-save-legal-source"
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? 'Đang lưu...' : isCreate ? 'Tạo nguồn' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  )
}
