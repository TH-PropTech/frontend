'use client'

import * as React from 'react'
import {
  Loader2,
  Lock,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { appToast } from '@/shared/ui/app-toast'
import { Button } from '@/shared/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import {
  ACTION_COLUMNS,
  BASE_ROLE_LABELS,
  cellKey,
  subjectMeta,
  toCellState,
  toEntries,
  useDeleteRole,
  useRoleMatrix,
  useSaveRolePermissions,
  type CellState,
} from '../../model/role-permission-matrix'
import { AssignUsersDialog } from './components/permission-matrix/assign-users-dialog'
import { CreateRoleDialog } from './components/permission-matrix/create-role-dialog'

const ADMIN_TAB = 'admin'

const sameState = (a: CellState, b: CellState): boolean =>
  Object.keys(a).every(key => a[key] === b[key])

/**
 * Admin bật/tắt từng thao tác (xem, tạo, sửa, xóa, duyệt) của khách thuê, chủ nhà, nhân viên và các
 * vai trò tùy chỉnh theo từng phân hệ. Danh sách phân hệ và thao tác lấy từ chính các route backend
 * đang chặn, nên mọi ô trong bảng đều có hiệu lực thật. Thao tác bị tắt trả 403; admin không bị
 * ảnh hưởng.
 */
export function PermissionMatrixView(): React.ReactElement {
  const matrix = useRoleMatrix()
  const save = useSaveRolePermissions()
  const remove = useDeleteRole()
  const [active, setActive] = React.useState<string>('staff')
  const [drafts, setDrafts] = React.useState<Record<string, CellState>>({})

  const data = matrix.data
  const tabs = React.useMemo(() => data?.tabs ?? [], [data])
  const tab = tabs.find(t => t.key === active)

  const saved = React.useMemo(() => {
    if (!data) return null
    return Object.fromEntries(
      data.tabs.map(t => [
        t.key,
        toCellState(data.schema[t.baseRole], data.entries[t.key] ?? []),
      ])
    ) as Record<string, CellState>
  }, [data])

  const isDirty = (key: string): boolean => {
    const draft = drafts[key]
    const base = saved?.[key]
    return Boolean(draft && base && !sameState(draft, base))
  }

  const current = tab && saved ? (drafts[tab.key] ?? saved[tab.key]) : undefined
  const rows = tab && data ? data.schema[tab.baseRole] : []
  const columns = ACTION_COLUMNS.filter(col =>
    rows.some(row => row.actions.includes(col.action))
  )
  const dirty = tab ? isDirty(tab.key) : false
  const total = current ? Object.keys(current).length : 0
  const enabled = current ? Object.values(current).filter(Boolean).length : 0

  const update = (next: CellState): void => {
    if (tab) setDrafts(prev => ({ ...prev, [tab.key]: next }))
  }

  const toggle = (key: string): void => {
    if (current) update({ ...current, [key]: !current[key] })
  }

  const setAll = (value: boolean): void => {
    if (current) {
      update(Object.fromEntries(Object.keys(current).map(k => [k, value])))
    }
  }

  const undo = (): void => {
    if (!tab) return
    setDrafts(prev => {
      const next = { ...prev }
      delete next[tab.key]
      return next
    })
  }

  const handleSave = async (): Promise<void> => {
    if (!tab || !data || !current) return
    try {
      await save.mutateAsync({
        roleId: tab.roleId,
        entries: toEntries(data.entries[tab.key] ?? [], current),
      })
      undo()
      appToast.success(
        `Đã lưu phân quyền ${tab.label.toLowerCase()}. Có hiệu lực sau vài giây.`
      )
    } catch {
      appToast.error('Không lưu được phân quyền. Vui lòng thử lại.')
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (!tab) return
    try {
      await remove.mutateAsync(tab.roleId)
      appToast.success(`Đã xóa vai trò "${tab.label}".`)
      setActive('staff')
    } catch {
      appToast.error('Không xóa được vai trò. Vui lòng thử lại.')
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Phân quyền theo vai trò
        </h2>
        <p className="text-xs text-muted mt-1 max-w-2xl leading-relaxed">
          Chọn một vai trò rồi bật hoặc tắt từng thao tác trên mỗi phân hệ. Thao
          tác đã tắt bị hệ thống từ chối ngay cả khi gọi trực tiếp. Quản trị
          viên luôn có đủ quyền.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Vai trò"
        className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface p-1.5"
      >
        {tabs.map(item => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active === item.key}
            onClick={() => setActive(item.key)}
            className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              active === item.key
                ? 'bg-fg text-bg'
                : 'text-muted hover:bg-fg/5 hover:text-fg'
            }`}
          >
            {item.label}
            {isDirty(item.key) ? (
              <span
                role="img"
                aria-label="Có thay đổi chưa lưu"
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-warning"
              />
            ) : null}
          </button>
        ))}
        <button
          type="button"
          role="tab"
          aria-selected={active === ADMIN_TAB}
          onClick={() => setActive(ADMIN_TAB)}
          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            active === ADMIN_TAB
              ? 'bg-fg text-bg'
              : 'text-muted hover:bg-fg/5 hover:text-fg'
          }`}
        >
          <Lock className="h-3 w-3" aria-hidden="true" />
          Quản trị viên
        </button>
        <CreateRoleDialog onCreated={setActive} />
      </div>

      {matrix.isPending ? (
        <p role="status" className="text-sm text-muted">
          Đang tải phân quyền...
        </p>
      ) : matrix.isError ? (
        <p role="alert" className="text-sm text-danger">
          Không tải được phân quyền. Vui lòng thử lại.
        </p>
      ) : active === ADMIN_TAB ? (
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-fg">
            <Lock className="h-4 w-4 text-muted" aria-hidden="true" />
            Vai trò: Quản trị viên (admin)
          </h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Quản trị viên luôn có toàn quyền trên mọi phân hệ và không thể bị
            giới hạn, để không ai tự khóa mình khỏi hệ thống.
          </p>
        </div>
      ) : tab && current ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-fg">
                Vai trò: {tab.label}{' '}
                <span className="ml-1 rounded bg-fg/5 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
                  {tab.key.toUpperCase()}
                </span>
                {tab.custom ? (
                  <span className="ml-1 rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    Dựa trên {BASE_ROLE_LABELS[tab.baseRole].toLowerCase()}
                  </span>
                ) : null}
              </h3>
              <p className="mt-0.5 text-xs text-muted">{tab.description}</p>
              <p className="mt-0.5 text-[11px] text-muted">
                {enabled} / {total} thao tác đang bật
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {tab.custom ? (
                <>
                  <AssignUsersDialog tab={tab} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        disabled={remove.isPending}
                        className="flex items-center gap-1.5 rounded-xl border border-danger/40 px-3 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Xóa vai trò
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-surface">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Xóa vai trò &quot;{tab.label}&quot;?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Người dùng đang được gán vai trò này sẽ trở về quyền
                          của vai trò gốc (
                          {BASE_ROLE_LABELS[tab.baseRole].toLowerCase()}). Không
                          thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Giữ lại</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void handleDelete()}>
                          Xóa vai trò
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : null}
              <button
                type="button"
                onClick={undo}
                disabled={!dirty || save.isPending}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-border text-muted hover:text-fg hover:bg-fg/5 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại
              </button>
              <Button
                type="button"
                onClick={() => void handleSave()}
                disabled={!dirty || save.isPending}
                className="rounded-xl text-xs"
              >
                {save.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {save.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="text-[11px] text-muted border-b border-border bg-surface-muted/30">
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Phân hệ ({rows.length})
                    </th>
                    {columns.map(col => (
                      <th
                        key={col.action}
                        scope="col"
                        className="px-3 py-3 text-center font-semibold"
                      >
                        {col.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-3 py-3 text-center font-semibold"
                    >
                      <span className="sr-only">Bật hoặc tắt cả hàng</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rows.map(row => {
                    const meta = subjectMeta(row.subject)
                    const keys = row.actions.map(a => cellKey(a, row.subject))
                    const rowOn = keys.every(k => current[k])
                    return (
                      <tr
                        key={row.subject}
                        className="hover:bg-surface-muted/20 transition-colors"
                      >
                        <th scope="row" className="px-5 py-3 align-middle">
                          <span className="block text-xs font-semibold text-fg">
                            {meta.label}
                          </span>
                          <span className="block font-mono text-[10px] font-normal text-muted">
                            {meta.code}
                          </span>
                        </th>
                        {columns.map(col => {
                          const supported = row.actions.includes(col.action)
                          const key = cellKey(col.action, row.subject)
                          return (
                            <td
                              key={col.action}
                              className="px-3 py-3 text-center"
                            >
                              {supported ? (
                                <input
                                  type="checkbox"
                                  checked={current[key] ?? false}
                                  onChange={() => toggle(key)}
                                  aria-label={`${col.label} ${meta.label} cho ${tab.label.toLowerCase()}`}
                                  className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="text-muted/50 text-sm"
                                >
                                  —
                                </span>
                              )}
                            </td>
                          )
                        })}
                        <td className="px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              update({
                                ...current,
                                ...Object.fromEntries(
                                  keys.map(k => [k, !rowOn])
                                ),
                              })
                            }
                            className="text-[10px] font-semibold text-primary hover:underline"
                          >
                            {rowOn ? 'Tắt hàng' : 'Bật hàng'}
                            <span className="sr-only"> {meta.label}</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-muted/20 px-5 py-3">
              <span className="text-[11px] text-muted">
                Dấu — nghĩa là phân hệ đó không có thao tác này với vai trò{' '}
                {tab.label.toLowerCase()}.
              </span>
              <div className="flex items-center gap-2 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className="px-2.5 py-1 rounded-lg border border-border text-muted hover:text-fg hover:bg-fg/5 transition-colors"
                >
                  Bật tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setAll(false)}
                  className="px-2.5 py-1 rounded-lg border border-border text-muted hover:text-fg hover:bg-fg/5 transition-colors"
                >
                  Tắt tất cả
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
