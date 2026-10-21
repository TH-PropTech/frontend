'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { PaymentHistoryView } from '@/features/payment-history'
import { StuckTransactionsView } from '@/features/rental-transactions'

/** Đường dẫn cũ của "Vận hành giao dịch thuê" mở thẳng tab giao dịch kẹt. */
const LEGACY_STUCK_SECTION = 'rental-ops'

export function PaymentOperationsView(): React.ReactElement {
  const pathname = usePathname()
  const defaultTab =
    pathname.split('/')[2] === LEGACY_STUCK_SECTION ? 'stuck' : 'payments'

  return (
    <Tabs defaultValue={defaultTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="payments">Giao dịch thanh toán</TabsTrigger>
        <TabsTrigger value="stuck">Giao dịch thuê kẹt</TabsTrigger>
      </TabsList>
      <TabsContent value="payments">
        <PaymentHistoryView />
      </TabsContent>
      <TabsContent value="stuck">
        <StuckTransactionsView />
      </TabsContent>
    </Tabs>
  )
}
