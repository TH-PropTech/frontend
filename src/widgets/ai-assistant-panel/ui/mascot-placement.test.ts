import { describe, it, expect } from 'vitest'
import {
  getMascotPlacement,
  MASCOT_PLACEMENT_CLASSES,
} from './mascot-placement'

describe('getMascotPlacement', () => {
  it.each(['/login', '/register', '/forgot-password', '/login/'])(
    'ẩn ở màn xác thực %s',
    path => {
      expect(getMascotPlacement(path)).toBe('hidden')
    }
  )

  it.each(['/contracts', '/contracts/abc', '/contracts/abc/signing'])(
    'nâng lên ở màn hợp đồng %s',
    path => {
      expect(getMascotPlacement(path)).toBe('raised')
    }
  )

  it('giữ mặc định ở trang khác, kể cả đường dẫn gần giống', () => {
    expect(getMascotPlacement('/')).toBe('default')
    expect(getMascotPlacement('/properties')).toBe('default')
    expect(getMascotPlacement('/loginx')).toBe('default')
    expect(getMascotPlacement('/contractsx')).toBe('default')
  })

  it('mặc định khi chưa có pathname', () => {
    expect(getMascotPlacement(null)).toBe('default')
    expect(getMascotPlacement(undefined)).toBe('default')
  })

  it('lớp CSS của ba trạng thái khác nhau', () => {
    expect(MASCOT_PLACEMENT_CLASSES.hidden).toBe('hidden')
    expect(MASCOT_PLACEMENT_CLASSES.raised).toContain('bottom-24')
    expect(MASCOT_PLACEMENT_CLASSES.default).toContain('bottom-4')
  })
})
