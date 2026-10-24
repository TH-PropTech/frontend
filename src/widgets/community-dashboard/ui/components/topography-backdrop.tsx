import * as React from 'react'

interface TopographyBackdropProps {
  /** Đường cong SVG (thuộc tính `d`) theo hệ tọa độ `viewBox`. */
  paths: readonly string[]
  viewBox: string
  className?: string
  strokeClassName?: string
}

/** Họa tiết đường đồng mức trang trí; không mang thông tin nên ẩn khỏi trình đọc màn hình. */
export function TopographyBackdrop({
  paths,
  viewBox,
  className = '',
  strokeClassName = 'text-primary',
}: TopographyBackdropProps): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <svg
        className="h-full w-full"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {paths.map(d => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            className={strokeClassName}
            strokeWidth="1.2"
            fill="none"
          />
        ))}
      </svg>
    </div>
  )
}
