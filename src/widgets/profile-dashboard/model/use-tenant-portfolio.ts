'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getMyContracts,
  type ContractItem,
  type ContractStatus,
} from '@/features/contracts'
import type { Property, RentalBill } from './types'

export interface TenantPortfolio {
  contracts: ContractItem[]
  activeContract: ContractItem | null
  properties: Property[]
  bills: RentalBill[]
  isLive: boolean
  isLoading: boolean
  isError: boolean
}

const EMPTY_PORTFOLIO: TenantPortfolio = {
  contracts: [],
  activeContract: null,
  properties: [],
  bills: [],
  isLive: false,
  isLoading: false,
  isError: false,
}

function mapContractStatus(status: ContractStatus): Property['status'] {
  if (status === 'active') return 'Đang thuê'
  if (
    [
      'draft',
      'deposit-pending',
      'deposit-paid',
      'awaiting-signature',
      'fully-signed-pending-deposit',
    ].includes(status)
  ) {
    return 'Đang chờ cọc'
  }
  return 'Trống'
}

export function contractToProperty(c: ContractItem): Property {
  return {
    id: c.propertyId || c._id,
    name: c.propertyTitle || `Căn hộ ${c.contractCode}`,
    code: c.contractCode,
    price: c.monthlyRent,
    contractId: c._id,
    status: mapContractStatus(c.status),
  }
}

export function contractToBills(c: ContractItem): RentalBill[] {
  const bills: RentalBill[] = []

  const depositPaid = [
    'deposit-paid',
    'awaiting-signature',
    'active',
    'completed',
    'terminated',
  ].includes(c.status)

  bills.push({
    id: `BILL-DEP-${c.contractCode}`,
    title: `Tiền đặt cọc giữ chỗ căn hộ (${c.contractCode})`,
    dueDate: c.startDate || new Date().toISOString().split('T')[0] || '',
    amount: c.deposit,
    status: depositPaid ? 'paid' : 'unpaid',
    ...(c.contractHash ? { txHash: c.contractHash } : {}),
  })

  if (['active', 'completed', 'terminated'].includes(c.status)) {
    const paymentDay = c.paymentDay || 5
    bills.push({
      id: `BILL-RENT-${c.contractCode}`,
      title: `Tiền thuê nhà định kỳ (${c.contractCode})`,
      dueDate: `Ngày ${paymentDay} hàng tháng`,
      amount: c.monthlyRent,
      status: 'paid',
      ...(c.contractHash ? { txHash: c.contractHash } : {}),
    })
  }

  return bills
}

export function pickActiveContract(
  contracts: ContractItem[]
): ContractItem | null {
  if (!contracts || contracts.length === 0) return null
  const active = contracts.find(c => c.status === 'active')
  if (active) return active

  const pending = contracts.find(c =>
    [
      'fully-signed-pending-deposit',
      'deposit-paid',
      'awaiting-signature',
      'deposit-pending',
      'draft',
    ].includes(c.status)
  )
  if (pending) return pending

  return contracts[0] || null
}

export function useTenantPortfolio(enabled: boolean): TenantPortfolio {
  const [hasToken, setHasToken] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(
      () => setHasToken(!!localStorage.getItem('accessToken')),
      0
    )
    return () => clearTimeout(timer)
  }, [])

  const live = enabled && hasToken

  const {
    data: contractsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-contracts'],
    queryFn: getMyContracts,
    enabled: live,
  })

  return React.useMemo(() => {
    if (!live || !contractsData) {
      return EMPTY_PORTFOLIO
    }

    const contracts = contractsData
    const activeContract = pickActiveContract(contracts)
    const properties = contracts.map(contractToProperty)
    const bills = activeContract ? contractToBills(activeContract) : []

    return {
      contracts,
      activeContract,
      properties,
      bills,
      isLive: true,
      isLoading,
      isError,
    }
  }, [live, contractsData, isLoading, isError])
}
