'use client'

import * as React from 'react'
import { SlidersHorizontal } from 'lucide-react'
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
import { STAFF_TOGGLEABLE_ITEMS } from '../model/nav-registry'
import { useNavConfig, useUpdateNavConfig } from '../model/use-nav-config'
import { ToggleSwitch } from './views/components/permission-matrix/toggle-switch'

const sameSet = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every(item => b.includes(item))

/** Admin bật/tắt từng mục menu mà nhân viên được thấy. */
export function NavCustomizeDialog(): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const config = useNavConfig()
  const update = useUpdateNavConfig()
  const saved = config.data?.hiddenForStaff
  // Bản nháp chỉ tồn tại khi admin đã chạm vào công tắc; chưa chạm thì theo dữ liệu đã lưu.
  const [draft, setDraft] = React.useState<string[] | null>(null)
  const hidden = draft ?? saved ?? []

  const toggleableIds = STAFF_TOGGLEABLE_ITEMS.map(item => item.id as string)
  const visibleCount = toggleableIds.filter(id => !hidden.includes(id)).length
  const dirty = draft !== null && !sameSet(draft, saved ?? [])
  const noneVisible = visibleCount === 0

  const toggle = (id: string): void => {
    setDraft(current => {
      const base = current ?? saved ?? []
      return base.includes(id) ? base.filter(x => x !== id) : [...base, id]
    })
  }

  const handleOpenChange = (next: boolean): void => {
    setOpen(next)
    if (!next) setDraft(null)
  }

  const save = async (): Promise<void> => {
    try {
      await update.mutateAsync(hidden)
      appToast.success('Đã lưu menu hiển thị cho nhân viên.')
      handleOpenChange(false)
    } catch {
      appToast.error('Không lưu được cấu hình menu. Vui lòng thử lại.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs font-semibold text-muted transition-colors hover:bg-fg/5 hover:text-fg"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Tuỳ chỉnh menu nhân viên
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto bg-surface">
        <DialogHeader>
          <DialogTitle>Menu hiển thị cho nhân viên</DialogTitle>
          <DialogDescription>
            Bật hoặc tắt từng mục trong menu bên trái của nhân viên. Quản trị
            viên luôn thấy đủ. Đây chỉ là ẩn hiện menu, quyền truy cập dữ liệu
            vẫn do phân quyền của hệ thống kiểm soát.
          </DialogDescription>
        </DialogHeader>

        {config.isPending ? (
          <p role="status" className="text-sm text-muted">
            Đang tải...
          </p>
        ) : config.isError ? (
          <p role="alert" className="text-sm text-danger">
            Không tải được cấu hình menu hiện tại.
          </p>
        ) : (
          <ul className="divide-y divide-line rounded-xl border border-line">
            {STAFF_TOGGLEABLE_ITEMS.map(item => {
              const on = !hidden.includes(item.id)
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 py-2.5"
                >
                  <span className="flex items-center gap-2.5 text-sm text-fg">
                    <span className="text-muted">{item.icon}</span>
                    {item.label}
                  </span>
                  <ToggleSwitch
                    checked={on}
                    onChange={() => toggle(item.id)}
                    ariaLabel={`${on ? 'Ẩn' : 'Hiện'} "${item.label}" với nhân viên`}
                  />
                </li>
              )
            })}
          </ul>
        )}

        {noneVisible ? (
          <p role="alert" className="text-xs text-danger">
            Cần giữ ít nhất một mục hiển thị để nhân viên còn dùng được hệ
            thống.
          </p>
        ) : null}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={update.isPending}
          >
            Hủy
          </Button>
          <Button
            type="button"
            loading={update.isPending}
            disabled={!dirty || noneVisible || config.isPending}
            onClick={() => void save()}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
