'use client'

import { useState } from 'react'

/** Thời điểm hiện tại, chốt một lần khi mở màn để kiểm tra quá hạn mà không gọi hàm không thuần lúc render. */
export function useNow(): number {
  const [now] = useState(() => Date.now())
  return now
}
