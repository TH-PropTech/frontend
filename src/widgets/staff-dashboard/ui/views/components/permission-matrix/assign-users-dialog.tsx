'use client'

import * as React from 'react'
import { Users } from 'lucide-react'
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
import {
  BASE_ROLE_LABELS,
  useAssignableUsers,
  useSetRoleUsers,
  type RoleTab,
} from '../../../../model/role-permission-matrix'

/** Gán người dùng vào một vai trò tùy chỉnh. Chỉ hiện người có đúng vai trò gốc. */
export function AssignUsersDialog({
  tab,
}: {
  tab: RoleTab
}): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [draft, setDraft] = React.useState<string[] | null>(null)
  const users = useAssignableUsers()
  const save = useSetRoleUsers()

  const candidates = React.useMemo(
    () => (users.data ?? []).filter(user => user.role === tab.baseRole),
    [users.data, tab.baseRole]
  )
  const members = React.useMemo(
    () =>
      candidates
        .filter(user => user.permissionProfile === tab.key)
        .map(u => u._id),
    [candidates, tab.key]
  )
  const selected = draft ?? members
  const query = search.trim().toLowerCase()
  const visible = candidates.filter(
    user =>
      !query ||
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  )
  const dirty =
    draft !== null &&
    (draft.length !== members.length || draft.some(id => !members.includes(id)))

  const toggle = (id: string): void => {
    setDraft(
      selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]
    )
  }

  const handleOpenChange = (next: boolean): void => {
    setOpen(next)
    if (!next) {
      setDraft(null)
      setSearch('')
    }
  }

  const submit = async (): Promise<void> => {
    try {
      await save.mutateAsync({ roleId: tab.roleId, userIds: selected })
      appToast.success(`Đã cập nhật người dùng của "${tab.label}".`)
      handleOpenChange(false)
    } catch {
      appToast.error('Không lưu được danh sách người dùng. Vui lòng thử lại.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-fg transition-colors hover:bg-fg/5"
        >
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          Người dùng ({members.length})
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto bg-surface">
        <DialogHeader>
          <DialogTitle>Người dùng của vai trò {tab.label}</DialogTitle>
          <DialogDescription>
            Chỉ hiện người dùng có vai trò gốc{' '}
            {BASE_ROLE_LABELS[tab.baseRole].toLowerCase()}. Người được chọn sẽ
            dùng bảng quyền của vai trò này thay cho vai trò gốc. Bỏ chọn để trả
            về quyền của vai trò gốc.
          </DialogDescription>
        </DialogHeader>

        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Tìm theo tên hoặc email"
          aria-label="Tìm người dùng"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />

        {users.isPending ? (
          <p role="status" className="text-sm text-muted">
            Đang tải...
          </p>
        ) : users.isError ? (
          <p role="alert" className="text-sm text-danger">
            Không tải được danh sách người dùng.
          </p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-muted">Không có người dùng phù hợp.</p>
        ) : (
          <ul className="max-h-72 divide-y divide-border overflow-y-auto rounded-xl border border-border">
            {visible.map(user => {
              const elsewhere =
                user.permissionProfile && user.permissionProfile !== tab.key
              return (
                <li key={user._id}>
                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-fg/5">
                    <input
                      type="checkbox"
                      checked={selected.includes(user._id)}
                      onChange={() => toggle(user._id)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-fg">
                        {user.fullName}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {user.email}
                        {elsewhere
                          ? ` · đang thuộc vai trò "${user.permissionProfile}"`
                          : ''}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            disabled={save.isPending}
            onClick={() => handleOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            loading={save.isPending}
            disabled={!dirty}
            onClick={() => void submit()}
          >
            Lưu danh sách
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
