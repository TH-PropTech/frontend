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
    <section
      aria-label="Công cụ đánh giá căn hộ"
      className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 pt-6 md:px-10"
    >
      <CostCalculatorModal apartmentId={propertyId} initialRent={monthlyRent} />
      <ReportFormDialog
        targetType="listing"
        targetId={propertyId}
        targetTitle={title}
      />
    </section>
  )
}
