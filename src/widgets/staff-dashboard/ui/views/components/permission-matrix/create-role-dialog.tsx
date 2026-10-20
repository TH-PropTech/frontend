'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { appToast } from '@/shared/ui/app-toast'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { readApiErrorCode } from '@/shared/api'
import {
  BASE_ROLE_LABELS,
  RESERVED_ROLE_CODES,
  ROLE_CODE_PATTERN,
  slugifyRoleName,
  useCreateRole,
  type ManagedRole,
} from '../../../../model/role-permission-matrix'

const BASE_OPTIONS: ManagedRole[] = ['staff', 'landlord', 'tenant']

/** Kiểm tra mã vai trò, trả về thông báo lỗi hoặc null nếu hợp lệ. */
export function validateRoleCode(code: string): string | null {
  if (!ROLE_CODE_PATTERN.test(code)) {
    return 'Mã gồm 3 đến 40 ký tự: chữ thường, số, gạch ngang hoặc gạch dưới, bắt đầu bằng chữ.'
  }
  if (RESERVED_ROLE_CODES.includes(code)) {
    return 'Mã này trùng với mã hệ thống, hãy chọn mã khác.'
  }
  return null
}

/** Admin tạo vai trò tùy chỉnh dựa trên một vai trò gốc, sao chép quyền hiện tại của vai trò gốc. */
export function CreateRoleDialog({
  onCreated,
}: {
  onCreated: (key: string) => void
}): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = React.useState('')
  const [code, setCode] = React.useState('')
  const [codeTouched, setCodeTouched] = React.useState(false)
  const [baseRole, setBaseRole] = React.useState<ManagedRole>('staff')
  const [description, setDescription] = React.useState('')
  const create = useCreateRole()

  const effectiveCode = codeTouched ? code : slugifyRoleName(label)
  const codeError = effectiveCode ? validateRoleCode(effectiveCode) : null
  const canSubmit = label.trim().length > 0 && !!effectiveCode && !codeError

  const reset = (): void => {
    setLabel('')
    setCode('')
    setCodeTouched(false)
    setBaseRole('staff')
    setDescription('')
  }

  const handleOpenChange = (next: boolean): void => {
    setOpen(next)
    if (!next) reset()
  }

  const submit = async (): Promise<void> => {
    try {
      await create.mutateAsync({
        name: effectiveCode,
        label: label.trim(),
        baseRole,
        ...(description.trim() ? { description: description.trim() } : {}),
      })
      appToast.success(`Đã tạo vai trò "${label.trim()}".`)
      onCreated(effectiveCode)
      handleOpenChange(false)
    } catch (error) {
      appToast.error(
        readApiErrorCode(error) === 'HTTP_409'
          ? 'Mã vai trò đã tồn tại. Hãy chọn mã khác.'
          : 'Không tạo được vai trò. Vui lòng thử lại.'
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-dashed border-primary/50 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft/40"
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
          Tạo vai trò
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-surface">
        <DialogHeader>
          <DialogTitle>Tạo vai trò mới</DialogTitle>
          <DialogDescription>
            Vai trò tùy chỉnh dựa trên một vai trò gốc, bắt đầu với đúng quyền
            hiện tại của vai trò đó. Bạn chỉnh riêng rồi gán cho từng người
            dùng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-xs">
          <label className="block font-semibold text-fg">
            Tên vai trò
            <input
              value={label}
              onChange={event => setLabel(event.target.value)}
              maxLength={60}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-normal outline-none focus:border-primary"
            />
          </label>

          <label className="block font-semibold text-fg">
            Mã vai trò
            <input
              value={effectiveCode}
              onChange={event => {
                setCode(event.target.value)
                setCodeTouched(true)
              }}
              maxLength={40}
              spellCheck={false}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm font-normal outline-none focus:border-primary"
            />
            {codeError ? (
              <span role="alert" className="mt-1 block font-normal text-danger">
                {codeError}
              </span>
            ) : (
              <span className="mt-1 block font-normal text-muted">
                Không đổi được sau khi tạo.
              </span>
            )}
          </label>

          <label className="block font-semibold text-fg">
            Dựa trên vai trò gốc
            <select
              value={baseRole}
              onChange={event => setBaseRole(event.target.value as ManagedRole)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-normal outline-none focus:border-primary"
            >
              {BASE_OPTIONS.map(role => (
                <option key={role} value={role}>
                  {BASE_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
            <span className="mt-1 block font-normal text-muted">
              Chỉ gán được cho người dùng có đúng vai trò gốc này.
            </span>
          </label>

          <label className="block font-semibold text-fg">
            Mô tả (không bắt buộc)
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              maxLength={255}
              rows={2}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-normal outline-none focus:border-primary"
            />
          </label>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            disabled={create.isPending}
            onClick={() => handleOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            loading={create.isPending}
            disabled={!canSubmit}
            onClick={() => void submit()}
          >
            Tạo vai trò
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
