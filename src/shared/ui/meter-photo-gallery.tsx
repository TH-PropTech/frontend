import * as React from 'react'

export interface MeterPhotoGalleryProps {
  label: string
  urls: string[] | undefined
}

/** Ảnh công tơ chỉ xem: bấm vào để mở ảnh gốc trong tab mới. Không có ảnh thì không hiện gì. */
export function MeterPhotoGallery({
  label,
  urls,
}: MeterPhotoGalleryProps): React.ReactElement | null {
  if (!urls || urls.length === 0) return null
  return (
    <div className="space-y-1" data-testid="meter-photo-gallery">
      <p className="text-[var(--muted)]">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {urls.map((url, index) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-16 w-16 overflow-hidden rounded-md border border-[var(--border)]"
            >
              <img
                src={url}
                alt={`${label} ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <span className="sr-only">(mở ảnh gốc trong tab mới)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
