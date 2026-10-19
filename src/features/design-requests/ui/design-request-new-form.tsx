'use client'

import * as React from 'react'
import { listApartmentDesigns } from '@/features/apartment-floorplan'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { appToast } from '@/shared/ui/app-toast'
import type { DesignRequestKind } from '../api/design-requests-api'
import { designRequestErrorMessage } from '../model/design-request-status'
import { useCreateDesignRequest } from '../model/use-landlord-design-requests'
import { AttachmentPicker } from './design-request-attachments'

const BRIEF_MAX = 2000

interface NewDesignRequestFormProps {
  apartmentId: string
}

export function NewDesignRequestForm({
  apartmentId,
}: NewDesignRequestFormProps): React.ReactElement {
  const [kind, setKind] = React.useState<DesignRequestKind>('create')
  const [targetDesignId, setTargetDesignId] = React.useState('')
  const [brief, setBrief] = React.useState('')
  const [attachments, setAttachments] = React.useState<string[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [designs, setDesigns] = React.useState<
    { id: string; name: string }[] | null
  >(null)
  const create = useCreateDesignRequest()

  React.useEffect(() => {
    if (kind !== 'edit' || designs !== null) return
    let active = true
    void listApartmentDesigns(apartmentId)
      .catch(() => [])
      .then(list => {
        if (active) setDesigns(list.map(d => ({ id: d.id, name: d.name })))
      })
    return () => {
      active = false
    }
  }, [kind, designs, apartmentId])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const trimmed = brief.trim()
    if (!trimmed) {
      setError('Vui lòng mô tả yêu cầu thiết kế.')
      return
    }
    if (trimmed.length > BRIEF_MAX) {
      setError(`Mô tả tối đa ${BRIEF_MAX} ký tự.`)
      return
    }
    if (kind === 'edit' && !targetDesignId) {
      setError('Vui lòng chọn thiết kế cần chỉnh sửa.')
      return
    }
    setError(null)
    try {
      await create.mutateAsync({
        apartmentId,
        kind,
        ...(kind === 'edit' ? { targetDesignId } : {}),
        brief: trimmed,
        ...(attachments.length > 0 ? { attachmentUrls: attachments } : {}),
      })
      appToast.success('Đã gửi yêu cầu thiết kế 3D.')
    } catch (err) {
      setError(designRequestErrorMessage(err))
    }
  }

  return (
    <form
      onSubmit={event => void handleSubmit(event)}
      className="space-y-4"
      noValidate
    >
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold text-fg">Loại yêu cầu</legend>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="design-request-kind"
            checked={kind === 'create'}
            onChange={() => setKind('create')}
          />
          Thiết kế mới
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="design-request-kind"
            checked={kind === 'edit'}
            onChange={() => setKind('edit')}
          />
          Chỉnh sửa thiết kế có sẵn
        </label>
      </fieldset>

      {kind === 'edit' ? (
        <div>
          <label
            htmlFor="design-request-target"
            className="text-xs font-bold text-fg"
          >
            Thiết kế cần chỉnh sửa
          </label>
          <select
            id="design-request-target"
            value={targetDesignId}
            onChange={event => setTargetDesignId(event.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">
              {designs === null ? 'Đang tải thiết kế...' : 'Chọn thiết kế'}
            </option>
            {(designs ?? []).map(design => (
              <option key={design.id} value={design.id}>
                {design.name}
              </option>
            ))}
          </select>
          {designs !== null && designs.length === 0 ? (
            <p className="mt-1 text-xs text-muted">
              Căn hộ chưa có thiết kế nào để chỉnh sửa.
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="design-request-brief"
          className="text-xs font-bold text-fg"
        >
          Mô tả yêu cầu
        </label>
        <Textarea
          id="design-request-brief"
          value={brief}
          maxLength={BRIEF_MAX}
          onChange={event => setBrief(event.target.value)}
          placeholder="Phong cách, màu sắc, bố trí nội thất mong muốn..."
          className="mt-1 min-h-28"
        />
        <p className="mt-1 text-right text-[11px] text-muted">
          {brief.length}/{BRIEF_MAX}
        </p>
      </div>

      <AttachmentPicker
        value={attachments}
        onChange={setAttachments}
        disabled={create.isPending}
      />

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={create.isPending} className="w-full">
        {create.isPending ? 'Đang gửi...' : 'Gửi yêu cầu'}
      </Button>
    </form>
  )
}
