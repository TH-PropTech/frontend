import {
  Camera,
  Clock3,
  FileText,
  ListChecks,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { Progress } from '@/shared/ui/progress'
import type { QualityScoreResult } from '../api/listing-quality-api'
const ICONS: Record<string, typeof Camera> = {
  photos: Camera,
  description: FileText,
  completeness: ListChecks,
  amenities: Sparkles,
  freshness: Clock3,
  location: MapPin,
}
export function QualityScoreCard({
  result,
}: {
  result: QualityScoreResult
}): React.ReactElement {
  return (
    <section className="rounded-3xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Chất lượng tin đăng</p>
          <p className="text-3xl font-bold text-fg">
            {result.score}
            <span className="text-base text-muted">/100</span>
          </p>
        </div>
        <Badge variant={result.grade === 'poor' ? 'destructive' : 'secondary'}>
          {result.grade}
        </Badge>
      </div>
      <div className="mt-5 space-y-3">
        {result.breakdown.map(item => {
          const Icon = ICONS[item.category] ?? ListChecks
          return (
            <div key={item.category}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-fg">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </span>
                <span className="text-muted">
                  {item.score}/{item.maxScore}
                </span>
              </div>
              <Progress value={(item.score / item.maxScore) * 100} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
