import { CheckCircle2, Circle } from 'lucide-react'
import type { ChecklistItem } from '../api/listing-quality-api'
const PRIORITY: Record<ChecklistItem['priority'], number> = {
  high: 0,
  medium: 1,
  low: 2,
}
export function ImprovementChecklist({
  checklist,
}: {
  checklist: ChecklistItem[]
}): React.ReactElement {
  const sorted = [...checklist].sort(
    (left, right) =>
      Number(left.completed) - Number(right.completed) ||
      PRIORITY[left.priority] - PRIORITY[right.priority]
  )
  return (
    <section className="rounded-3xl border border-border bg-surface p-6">
      <h3 className="text-base font-bold text-fg">Việc cần cải thiện</h3>
      <ul className="mt-3 space-y-2">
        {sorted.map(item => (
          <li
            key={item.id}
            className={`flex items-center gap-2 text-sm ${item.completed ? 'text-muted line-through' : 'text-fg'}`}
          >
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <Circle className="h-4 w-4 text-muted" />
            )}
            <span className="flex-1">{item.label}</span>
            <span className="text-xs text-muted">{item.priority}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
