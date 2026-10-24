import * as React from 'react'

export default function Loading(): React.ReactElement {
  return (
    <main className="grid min-h-screen place-items-center px-6 bg-bg text-fg">
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"
          aria-label="Đang tải dữ liệu"
          role="status"
        />
        <p className="text-sm font-bold text-muted">Đang tải dữ liệu...</p>
      </div>
    </main>
  )
}
