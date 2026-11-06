'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { Loader2, Plus, Trash2, UserPlus } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { MeterPhotoField } from '@/shared/ui/meter-photo-field'
import {
  LegalReferences,
  LEGAL_SOURCE_KEYS,
  RESIDENCE_AREA_NOTE,
} from '@/entities/legal-source'
import type {
  CreateOccupantRequestInput,
  OccupantRequestPerson,
} from '../api/occupant-requests-api'
import { formatDate, formatMoney } from '../lib/occupant-request-labels'

export const MAX_PEOPLE_PER_REQUEST = 5
const FIELD_CLASS =
  'mt-1 min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2'

interface PersonDraft {
  fullName: string
  birthYear: string
  relationship: string
  idPhotoUrls: string[]
}

const EMPTY_PERSON: PersonDraft = {
  fullName: '',
  birthYear: '',
  relationship: '',
  idPhotoUrls: [],
}

export interface OccupantRequestFormProps {
  busy: boolean
  /** Số người ở hiện tại, gồm cả người thuê. */
  currentOccupants: number
  /** Giới hạn của căn hộ; null khi tin cũ chưa đặt. */
  maxOccupants: number | null
  /** Tiền thuê hằng tháng hiện tại (đồng). */
  currentRent: number
  onSubmit: (input: CreateOccupantRequestInput) => void
  onCancel: () => void
}

function validate(people: PersonDraft[], moveInDate: string, reason: string) {
  const errors: Record<string, string> = {}
  people.forEach((person, index) => {
    const year = Number(person.birthYear)
    if (!person.fullName.trim())
      errors[`name-${index}`] = 'Vui lòng nhập họ tên người ở.'
    if (!Number.isInteger(year) || year < 1900 || year > 2100)
      errors[`year-${index}`] = 'Vui lòng nhập năm sinh hợp lệ.'
    if (!person.relationship.trim())
      errors[`relation-${index}`] = 'Vui lòng nhập quan hệ với người thuê.'
    if (person.idPhotoUrls.length === 0)
      errors[`photo-${index}`] = 'Vui lòng tải ảnh giấy tờ của người ở.'
  })
  if (!moveInDate) errors.moveInDate = 'Vui lòng chọn ngày chuyển vào.'
  if (!reason.trim()) errors.reason = 'Vui lòng nhập lý do.'
  return errors
}

/** Form Khách thuê xin thêm người ở; chặn vượt giới hạn ngay lúc nhập. */
export function OccupantRequestForm({
  busy,
  currentOccupants,
  maxOccupants,
  currentRent,
  onSubmit,
  onCancel,
}: OccupantRequestFormProps): ReactElement {
  const [people, setPeople] = useState<PersonDraft[]>([{ ...EMPTY_PERSON }])
  const [moveInDate, setMoveInDate] = useState('')
  const [reason, setReason] = useState('')
  const [surcharge, setSurcharge] = useState('0')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const room =
    maxOccupants === null
      ? MAX_PEOPLE_PER_REQUEST
      : Math.max(0, maxOccupants - currentOccupants)
  const allowedPeople = Math.min(MAX_PEOPLE_PER_REQUEST, room)
  const overLimit = people.length > allowedPeople
  const surchargeValue = Math.max(0, Math.floor(Number(surcharge) || 0))
  const totalAfter = currentOccupants + people.length

  const updatePerson = (index: number, patch: Partial<PersonDraft>): void =>
    setPeople(current =>
      current.map((person, i) =>
        i === index ? { ...person, ...patch } : person
      )
    )

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (overLimit) return
    const found = validate(people, moveInDate, reason)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit({
      occupants: people.map(person => ({
        fullName: person.fullName.trim(),
        birthYear: Number(person.birthYear),
        relationship: person.relationship.trim(),
        idPhotoUrls: person.idPhotoUrls,
      })) satisfies OccupantRequestPerson[],
      moveInDate,
      reason: reason.trim(),
      proposedSurcharge: surchargeValue,
    })
  }

  if (allowedPeople === 0) {
    return (
      <p
        role="alert"
        data-testid="occupant-limit-reached"
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs text-[var(--fg)]"
      >
        Căn hộ này cho phép tối đa {maxOccupants} người ở và hiện đã đủ. Bạn
        chưa thể thêm người ở mới.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Yêu cầu thêm người ở"
      className="space-y-4 border-t border-[var(--border)] pt-4"
    >
      {people.map((person, index) => (
        <fieldset
          key={index}
          data-testid="occupant-person"
          className="space-y-2 rounded-lg border border-[var(--border)] p-3"
        >
          <legend className="px-1 text-xs font-semibold text-[var(--fg)]">
            Người ở thứ {index + 1}
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="text-xs">
              Họ tên
              <input
                maxLength={100}
                value={person.fullName}
                onChange={event =>
                  updatePerson(index, { fullName: event.target.value })
                }
                className={FIELD_CLASS}
              />
              {errors[`name-${index}`] ? (
                <span role="alert" className="text-[var(--danger)]">
                  {errors[`name-${index}`]}
                </span>
              ) : null}
            </label>
            <label className="text-xs">
              Năm sinh
              <input
                type="number"
                min="1900"
                max="2100"
                value={person.birthYear}
                onChange={event =>
                  updatePerson(index, { birthYear: event.target.value })
                }
                className={FIELD_CLASS}
              />
              {errors[`year-${index}`] ? (
                <span role="alert" className="text-[var(--danger)]">
                  {errors[`year-${index}`]}
                </span>
              ) : null}
            </label>
            <label className="text-xs">
              Quan hệ với người thuê
              <input
                maxLength={50}
                value={person.relationship}
                onChange={event =>
                  updatePerson(index, { relationship: event.target.value })
                }
                className={FIELD_CLASS}
              />
              {errors[`relation-${index}`] ? (
                <span role="alert" className="text-[var(--danger)]">
                  {errors[`relation-${index}`]}
                </span>
              ) : null}
            </label>
          </div>
          <MeterPhotoField
            id={`occupant-id-photo-${index}`}
            label="Ảnh giấy tờ tùy thân"
            urls={person.idPhotoUrls}
            max={2}
            disabled={busy}
            error={errors[`photo-${index}`]}
            onChange={urls => updatePerson(index, { idPhotoUrls: urls })}
          />
          {people.length > 1 ? (
            <Button
              type="button"
              variant="ghost"
              aria-label={`Xóa người ở thứ ${index + 1}`}
              className="min-h-11"
              onClick={() =>
                setPeople(current => current.filter((_, i) => i !== index))
              }
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Xóa người này
            </Button>
          ) : null}
        </fieldset>
      ))}
      <Button
        type="button"
        variant="secondary"
        className="min-h-11"
        disabled={people.length >= allowedPeople}
        onClick={() => setPeople(current => [...current, { ...EMPTY_PERSON }])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Thêm người
      </Button>
      {overLimit ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          Căn hộ này cho phép tối đa {maxOccupants} người ở.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs">
          Ngày dự kiến chuyển vào
          <input
            type="date"
            value={moveInDate}
            onChange={event => setMoveInDate(event.target.value)}
            className={FIELD_CLASS}
          />
          {errors.moveInDate ? (
            <span role="alert" className="text-[var(--danger)]">
              {errors.moveInDate}
            </span>
          ) : null}
        </label>
        <label className="text-xs">
          Phụ phí hằng tháng đề xuất (đồng)
          <input
            type="number"
            min="0"
            max="10000000"
            step="1000"
            value={surcharge}
            onChange={event => setSurcharge(event.target.value)}
            className={FIELD_CLASS}
          />
          <span className="text-[var(--muted)]">
            Hai bên tự thỏa thuận, hệ thống không tự tính hay tự thu. Để 0 nếu
            không phát sinh phí.
          </span>
        </label>
        <label className="text-xs sm:col-span-2">
          Lý do
          <textarea
            maxLength={500}
            value={reason}
            onChange={event => setReason(event.target.value)}
            className={FIELD_CLASS}
          />
          {errors.reason ? (
            <span role="alert" className="text-[var(--danger)]">
              {errors.reason}
            </span>
          ) : null}
        </label>
      </div>

      <dl
        data-testid="occupant-request-summary"
        className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-2 rounded-lg bg-[var(--surface-muted)] p-3 text-xs"
      >
        <div>
          <dt className="text-[var(--muted)]">Số người ở sau khi thêm</dt>
          <dd className="font-semibold text-[var(--fg)]">
            {totalAfter}
            {maxOccupants !== null ? ` / tối đa ${maxOccupants}` : ''}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Tiền thuê hằng tháng mới</dt>
          <dd className="font-semibold text-[var(--fg)]">
            {formatMoney(currentRent + surchargeValue)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Áp dụng từ</dt>
          <dd className="font-semibold text-[var(--fg)]">
            {moveInDate
              ? `Các kỳ chưa thanh toán sau ${formatDate(moveInDate)}`
              : 'Chọn ngày chuyển vào'}
          </dd>
        </div>
      </dl>
      <p className="text-xs text-[var(--muted)]">
        Sau khi Chủ nhà đồng ý, hệ thống tạo phụ lục hợp đồng để hai bên xác
        nhận. Tiền thuê các kỳ chưa thanh toán chỉ đổi khi phụ lục có hiệu lực.
      </p>
      <LegalReferences
        sourceKeys={LEGAL_SOURCE_KEYS.residence}
        note={RESIDENCE_AREA_NOTE}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy || overLimit} className="min-h-11">
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <UserPlus className="h-4 w-4" aria-hidden="true" />
          )}
          Gửi yêu cầu
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={busy}
          onClick={onCancel}
        >
          Hủy
        </Button>
      </div>
    </form>
  )
}
