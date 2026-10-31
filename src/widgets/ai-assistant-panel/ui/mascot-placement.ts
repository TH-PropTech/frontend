export type MascotPlacement = 'hidden' | 'raised' | 'default'

const AUTH_ROUTE = /^\/(login|register|forgot-password)(\/|$)/
const CONTRACT_ROUTE = /^\/contracts(\/|$)/

/**
 * Vị trí nút trợ lý nổi: ẩn ở màn đăng nhập/đăng ký (đè chân trang),
 * nâng lên ở màn hợp đồng (tránh thanh ký cố định và thanh tab ở đáy).
 */
export function getMascotPlacement(
  pathname: string | null | undefined
): MascotPlacement {
  if (!pathname) return 'default'
  if (AUTH_ROUTE.test(pathname)) return 'hidden'
  if (CONTRACT_ROUTE.test(pathname)) return 'raised'
  return 'default'
}

export const MASCOT_PLACEMENT_CLASSES: Record<MascotPlacement, string> = {
  hidden: 'hidden',
  raised: 'bottom-24 right-4 sm:bottom-6 sm:right-6',
  default: 'bottom-4 right-4 sm:bottom-6 sm:right-6',
}
