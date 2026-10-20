'use client'

import * as React from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getContractPayoutSummary, getMyPayouts } from '@/entities/payout'
import type { LandlordPortfolio } from './types'
import {
  cashflowRows,
  cumulativeRevenue,
  type CashflowRow,
  type RevenuePoint,
} from './landlord-cashflow'

export interface LandlordCashflow {
  isLoading: boolean
  isError: boolean
  rows: CashflowRow[]
  series: RevenuePoint[]
}

/**
 * Dòng tiền của chủ nhà từ backend: khoản nhận theo từng hợp đồng (`/payouts/contracts/:id/summary`),
 * các khoản đã chuyển về ngân hàng (`/payouts/me`, dùng chung cache với "Lịch sử nhận tiền").
 * Chỉ chạy khi danh mục căn hộ đang ở chế độ dữ liệu thật.
 */
export function useLandlordCashflow(
  portfolio: LandlordPortfolio
): LandlordCashflow {
  const live = portfolio.isLive && !portfolio.isLoading && !portfolio.isError
  const contracts = React.useMemo(
    () =>
      portfolio.properties.flatMap(p => {
        const c = portfolio.contractByProperty[p.id]
        return c ? [{ id: c._id, propertyName: p.name }] : []
      }),
    [portfolio.properties, portfolio.contractByProperty]
  )

  const payouts = useQuery({
    queryKey: ['payouts', 'me'],
    queryFn: getMyPayouts,
    enabled: live,
  })
  const summaries = useQueries({
    queries: contracts.map(c => ({
      queryKey: ['payouts', 'contract-summary', c.id],
      queryFn: () => getContractPayoutSummary(c.id),
      enabled: live,
    })),
  })

  // khóa ổn định theo thời điểm dữ liệu từng hợp đồng cập nhật (mảng deps không được đổi độ dài)
  const summaryKey = summaries.map(s => s.dataUpdatedAt).join(',')
  const rows = React.useMemo(
    () =>
      cashflowRows(
        contracts.flatMap((c, i) => {
          const summary = summaries[i]?.data
          return summary ? [{ propertyName: c.propertyName, summary }] : []
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contracts, summaryKey]
  )
  const series = React.useMemo(
    () => cumulativeRevenue(payouts.data?.items ?? []),
    [payouts.data]
  )

  return {
    isLoading: live && (payouts.isLoading || summaries.some(s => s.isLoading)),
    isError: live && (payouts.isError || summaries.some(s => s.isError)),
    rows,
    series,
  }
}
