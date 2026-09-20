'use client'

import { CostCalculatorModal } from '@/features/living-cost'
import { ReportFormDialog } from '@/features/safety-reports'

interface PropertyDecisionActionsProps {
  propertyId: string
  title: string
  monthlyRent: number
}

export function PropertyDecisionActions({
  propertyId,
  title,
  monthlyRent,
}: PropertyDecisionActionsProps): React.ReactElement {
  return (
    <div
      role="group"
      aria-label="Công cụ đánh giá căn hộ"
      className="flex flex-wrap items-center gap-2"
    >
      <CostCalculatorModal apartmentId={propertyId} initialRent={monthlyRent} />
      <ReportFormDialog
        targetType="listing"
        targetId={propertyId}
        targetTitle={title}
      />
    </div>
  )
}
