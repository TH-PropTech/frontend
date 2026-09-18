'use client'

import * as React from 'react'
import { FileText } from 'lucide-react'
import {
  LandlordApplicationList,
  ApplicationReviewDialog,
  useLandlordApplications,
  type RentalApplicationItem,
} from '@/features/rental-application'

export function TabLandlordApplications(): React.ReactElement {
  const { selectedApplication, setSelectedApplication, respond, isResponding } =
    useLandlordApplications()

  const [isReviewOpen, setIsReviewOpen] = React.useState(false)

  const handleSelect = (app: RentalApplicationItem) => {
    setSelectedApplication(app)
    setIsReviewOpen(true)
  }

  return (
    <div className="space-y-6" data-testid="tab-landlord-applications">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <FileText className="h-4 w-4" />
          <span>Quản lý giao dịch người thuê</span>
        </div>
        <h2 className="font-display text-xl font-bold text-fg">
          Hồ sơ đề nghị thuê nhận được
        </h2>
        <p className="text-xs text-muted">
          Thẩm định thông tin người thuê, số người ở và thời hạn để chấp thuận
          hoặc từ chối đề nghị thuê.
        </p>
      </div>

      <LandlordApplicationList onSelectApplication={handleSelect} />

      <ApplicationReviewDialog
        application={selectedApplication}
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        onRespond={respond}
        isResponding={isResponding}
      />
    </div>
  )
}
