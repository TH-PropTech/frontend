'use client'

import * as React from 'react'
import type { ApartmentItem } from '@/entities/properties'
import { RentCalculator } from './rent-calculator'
import { CommuteEstimator } from './commute-estimator'
import { PropertyComparison } from './property-comparison'
import { PriceTrendPanel } from './price-trend-panel'
import { AmbientRadarPanel } from './ambient-radar-panel'
import { EnergyEfficiencyPanel } from './energy-efficiency-panel'
import { CostBreakdownPanel } from './cost-breakdown-panel'
import { AnalyticsExplainModal } from './analytics-explain-modal'

const formatCurrency = (val: number): string => {
  return val.toLocaleString('vi-VN') + ' đ'
}

interface PropertyAnalyticsProps {
  property: ApartmentItem
}

export function PropertyAnalytics({
  property,
}: PropertyAnalyticsProps): React.ReactElement {
  const price = property.priceNum ? property.priceNum * 1000000 : 18000000
  const bookingDeposit = price
  const escrowDeposit = price * 2
  const firstMonthRent = price
  const totalInitial = bookingDeposit + escrowDeposit + firstMonthRent

  const [explainData, setExplainData] = React.useState<{
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  } | null>(null)

  return (
    <div className="space-y-8">
      {/* 1. Price Historical Trends & Blockchain Ledger Trust Verification */}
      <PriceTrendPanel property={property} onExplain={setExplainData} />

      {/* 2. Living Ambient Radar */}
      <AmbientRadarPanel onExplain={setExplainData} />

      {/* 3. Energy Efficiency Rating */}
      <EnergyEfficiencyPanel onExplain={setExplainData} />

      {/* 4. Cost Breakdown */}
      <CostBreakdownPanel
        bookingDeposit={bookingDeposit}
        escrowDeposit={escrowDeposit}
        firstMonthRent={firstMonthRent}
        totalInitial={totalInitial}
        formatCurrency={formatCurrency}
        onExplain={setExplainData}
      />

      {/* 5. Rent Affordability Calculator */}
      <RentCalculator price={price} />

      {/* 6. Commute & Transit Estimator */}
      <CommuteEstimator />

      {/* 7. Quick Comparison Matrix */}
      <PropertyComparison property={property} />

      {/* Logic Explanation Modal */}
      <AnalyticsExplainModal
        isOpen={explainData !== null}
        onClose={() => setExplainData(null)}
        data={explainData}
      />
    </div>
  )
}
