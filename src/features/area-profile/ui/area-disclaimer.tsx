import { Info } from 'lucide-react'

export function AreaDisclaimer({
  source,
  disclaimer,
  lastSurveyedAt,
}: {
  source: string
  disclaimer: string
  lastSurveyedAt: string
}): React.ReactElement {
  return (
    <div className="flex items-start gap-2 border-t border-border pt-3 text-xs text-muted">
      <Info
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
        aria-hidden="true"
      />
      <p>
        Nguồn: {source} · Cập nhật:{' '}
        {new Date(lastSurveyedAt).toLocaleDateString('vi-VN')}. {disclaimer}
      </p>
    </div>
  )
}
