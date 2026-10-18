'use client'

import { ReportFormDialog } from '@/features/safety-reports'

interface PropertyDecisionActionsProps {
  propertyId: string
  title: string
}

export function PropertyDecisionActions({
  propertyId,
  title,
}: PropertyDecisionActionsProps): React.ReactElement {
  return (
    <div
      role="group"
      aria-label="Công cụ đánh giá căn hộ"
      className="flex flex-wrap items-center gap-2"
    >
      <ReportFormDialog
        targetType="listing"
        targetId={propertyId}
        targetTitle={title}
      />
    </div>
  )
}
