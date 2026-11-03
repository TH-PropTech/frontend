'use client'

import { LandlordPayoutHistory } from './landlord-payout-history'
import { LandlordWallet } from './landlord-wallet'
import type { UseProfileReturn } from '../model/use-profile'

/** Ví gắn với tài khoản, dùng chung cho cả hai vai trò. */
export function TabWallet({
  profile,
}: {
  profile: UseProfileReturn
}): React.ReactElement {
  return (
    <div className="space-y-5 mt-0 outline-none">
      <LandlordWallet />
      {profile.role === 'landlord' && <LandlordPayoutHistory />}
    </div>
  )
}
