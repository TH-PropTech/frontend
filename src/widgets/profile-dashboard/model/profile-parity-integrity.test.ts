import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { formatDate } from '../lib/format-date'
import { buildMonthlyCostBreakdown } from './cost-breakdown'
import { useSessions } from './use-sessions'
import { useNotificationPreferences } from './use-notification-preferences'
import { useProfileMaintenance } from './use-profile-maintenance'
import { EVENT_LABELS } from './event-labels'
import { contractToBills } from './use-tenant-portfolio'
import { progressFlags } from './landlord-portfolio'
import parityFixtures from '../profile-parity.fixtures.json'
import { apiClient } from '@/shared/api/api-client'
import type { ContractItem } from '@/features/contracts'
import type { RentalBill } from './types'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
  ApiClientError: class extends Error {
    constructor(
      message: string,
      readonly status: number,
      readonly body: unknown
    ) {
      super(message)
    }
  },
}))

describe('Task 2.8 & 2.12: formatDate', () => {
  it('formats ISO date to dd/MM/yyyy in Asia/Ho_Chi_Minh timezone', () => {
    // 2026-10-28T00:00:00.000Z is 07:00 AM on 28/10/2026 in Vietnam
    expect(formatDate('2026-10-28T00:00:00.000Z')).toBe('28/10/2026')
    // 2026-10-27T18:00:00.000Z is 01:00 AM on 28/10/2026 in Vietnam
    expect(formatDate('2026-10-27T18:00:00.000Z')).toBe('28/10/2026')
  })

  it('returns — for null, undefined, empty string or invalid dates', () => {
    expect(formatDate(null)).toBe('—')
    expect(formatDate(undefined)).toBe('—')
    expect(formatDate('')).toBe('—')
    expect(formatDate('not-a-date')).toBe('—')
  })
})

describe('Task 2.3 & 2.12: buildMonthlyCostBreakdown', () => {
  it('returns empty array when contract and bills are empty or zero', () => {
    expect(buildMonthlyCostBreakdown(null, [])).toEqual([])

    const zeroContract = { monthlyRent: 0 } as unknown as ContractItem
    expect(buildMonthlyCostBreakdown(zeroContract, [])).toEqual([])
  })

  it('includes monthly rent from contract when amount > 0 and status is active', () => {
    const contract = {
      status: 'active',
      monthlyRent: 15_000_000,
    } as unknown as ContractItem

    const breakdown = buildMonthlyCostBreakdown(contract, [])
    expect(breakdown).toHaveLength(1)
    expect(breakdown[0]).toEqual({
      key: 'rent',
      label: 'Tiền thuê',
      amount: 15_000_000,
    })
  })

  it('filters out zero-amount items and one-time deposit bills', () => {
    const contract = {
      status: 'active',
      monthlyRent: 10_000_000,
    } as unknown as ContractItem

    const bills: RentalBill[] = [
      {
        id: 'BILL-DEP-001',
        title: 'Tiền đặt cọc giữ chỗ căn hộ',
        amount: 10_000_000,
        dueDate: '2026-10-28',
        status: 'paid',
      },
      {
        id: 'BILL-ELEC-001',
        title: 'Tiền điện tháng 10',
        amount: 850_000,
        dueDate: '2026-10-28',
        status: 'unpaid',
      },
      {
        id: 'BILL-WATER-001',
        title: 'Tiền nước sinh hoạt',
        amount: 0, // Should be omitted
        dueDate: '2026-10-28',
        status: 'unpaid',
      },
      {
        id: 'BILL-SVC-001',
        title: 'Phí dịch vụ quản lý',
        amount: 450_000,
        dueDate: '2026-10-28',
        status: 'unpaid',
      },
    ]

    const breakdown = buildMonthlyCostBreakdown(contract, bills)
    expect(breakdown).toEqual([
      { key: 'rent', label: 'Tiền thuê', amount: 10_000_000 },
      { key: 'electricity', label: 'Tiền điện', amount: 850_000 },
      { key: 'service', label: 'Phí QL', amount: 450_000 },
    ])
  })
})

describe('Task 2.5 & 2.12: useSessions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches sessions and sets ready status on success', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      items: [
        {
          id: 'sess-1',
          deviceLabel: 'Chrome trên Windows',
          ipMasked: '14.161.42.xxx',
          lastActiveAt: '2026-10-28T09:00:00Z',
          isCurrent: true,
        },
        {
          id: 'sess-2',
          deviceLabel: 'Safari trên iPhone',
          ipMasked: '113.190.23.xxx',
          lastActiveAt: '2026-10-27T10:00:00Z',
          isCurrent: false,
        },
      ],
    })

    const { result } = renderHook(() => useSessions())
    expect(result.current.status).toBe('loading')

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.status).toBe('ready')
    expect(result.current.sessions).toHaveLength(2)
    expect(result.current.sessions[0]?.isCurrent).toBe(true)
  })

  it('revokes non-current session via DELETE API and removes from list', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      items: [
        {
          id: 'sess-1',
          deviceLabel: 'Chrome trên Windows',
          ipMasked: '14.161.42.xxx',
          lastActiveAt: '2026-10-28T09:00:00Z',
          isCurrent: true,
        },
        {
          id: 'sess-2',
          deviceLabel: 'Safari trên iPhone',
          ipMasked: '113.190.23.xxx',
          lastActiveAt: '2026-10-27T10:00:00Z',
          isCurrent: false,
        },
      ],
    })
    vi.mocked(apiClient.delete).mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useSessions())
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    await act(async () => {
      await result.current.revokeSession('sess-2')
    })

    expect(apiClient.delete).toHaveBeenCalledWith('/users/me/sessions/sess-2')
    expect(result.current.sessions).toHaveLength(1)
    expect(result.current.sessions[0]?.id).toBe('sess-1')
  })

  it('handles fetch error and allows retry', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useSessions())
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.status).toBe('error')

    // Retry
    vi.mocked(apiClient.get).mockResolvedValueOnce({ items: [] })
    await act(async () => {
      result.current.retry()
    })

    expect(result.current.status).toBe('ready')
    expect(result.current.sessions).toEqual([])
  })
})

describe('Task 2.5 & 2.12: useNotificationPreferences optimistic update & rollback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads notification preferences on mount', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ email: true, push: false })

    const { result } = renderHook(() => useNotificationPreferences())
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.preferences).toEqual({ email: true, push: false })
  })

  it('optimistically updates preference and stays on success', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ email: true, push: true })
    vi.mocked(apiClient.put).mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useNotificationPreferences())
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    await act(async () => {
      await result.current.togglePreference('email')
    })

    expect(result.current.preferences.email).toBe(false)
    expect(apiClient.put).toHaveBeenCalledWith(
      '/users/me/notification-preferences',
      { email: false, push: true }
    )
  })

  it('rolls back preference on network or server error', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ email: true, push: true })
    vi.mocked(apiClient.put).mockRejectedValueOnce(new Error('Server error'))

    const { result } = renderHook(() => useNotificationPreferences())
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    await act(async () => {
      await result.current.togglePreference('push')
    })

    // Rollback to original true
    expect(result.current.preferences.push).toBe(true)
  })
})

describe('Task 2.4 & 2.12: useProfileMaintenance 3 states', () => {
  it('initializes with ready status and empty tickets array', () => {
    const addLogMock = vi.fn()
    const { result } = renderHook(() => useProfileMaintenance(addLogMock))

    expect(result.current.status).toBe('ready')
    expect(result.current.maintenanceTickets).toEqual([])
  })

  it('submits a new ticket and creates pending ticket', () => {
    const addLogMock = vi.fn()
    const { result } = renderHook(() => useProfileMaintenance(addLogMock))

    act(() => {
      result.current.setNewTicketTitle('Hỏng vòi sen')
      result.current.setNewTicketDesc('Vòi sen nhà tắm bị rò nước')
    })

    act(() => {
      const fakeEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent
      result.current.handleNewMaintenanceTicket(fakeEvent)
    })

    expect(result.current.maintenanceTickets).toHaveLength(1)
    expect(result.current.maintenanceTickets[0]?.title).toBe('Hỏng vòi sen')
    expect(result.current.maintenanceTickets[0]?.status).toBe('pending')
  })

  it('approves ticket and calls addBlockchainLog', () => {
    const addLogMock = vi.fn()
    const { result } = renderHook(() => useProfileMaintenance(addLogMock))

    act(() => {
      result.current.setNewTicketTitle('Sự cố điện')
      result.current.setNewTicketDesc('Chập cầu dao')
    })
    act(() => {
      result.current.handleNewMaintenanceTicket({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    const ticketId = result.current.maintenanceTickets[0]?.id || ''
    act(() => {
      result.current.handleApproveTicket(ticketId)
    })

    expect(result.current.maintenanceTickets[0]?.status).toBe('processing')
    expect(addLogMock).toHaveBeenCalledWith(
      'MAINTENANCE_APPROVED_BY_LANDLORD',
      expect.any(String)
    )
  })
})

describe('Task 2.8 & 2.12: Banned terminology and uppercase code leak checks', () => {
  const BANNED_TERMS = ['ký quỹ', 'PayOS', 'Techcombank', 'khóa bảo chứng']

  it('EVENT_LABELS has only clean labels and no banned terms or raw details', () => {
    for (const [, config] of Object.entries(EVENT_LABELS)) {
      expect(config.label).toBeDefined()
      expect(config.iconName).toBeDefined()
      expect(config.details).toBeUndefined() // Fake details removed

      for (const banned of BANNED_TERMS) {
        expect(config.label.toLowerCase()).not.toContain(banned.toLowerCase())
      }
    }
  })
})

describe('Decision D2: Parity Fixtures Cross-Verification', () => {
  function computeProgress(contract: ContractItem): number {
    const flags = progressFlags(contract)
    if (flags.leaseTerminated || flags.handoverSigned) return 100
    if (flags.firstMonthPaid) return 80
    if (flags.contractSigned) return 60
    if (flags.depositPaid) return 40
    return 20
  }

  for (const scenario of parityFixtures.scenarios) {
    it(`verifies parity for scenario: ${scenario.id} (${scenario.description})`, () => {
      const contract = scenario.contract as unknown as ContractItem

      // 1. Progress percent parity
      const progress = computeProgress(contract)
      expect(progress).toBe(scenario.expected.progressPercent)

      // 2. Bills mapping parity
      const bills = contractToBills(contract)
      expect(bills.length).toBe(scenario.expected.bills.length)
      for (let i = 0; i < bills.length; i++) {
        expect(bills[i]?.id).toBe(scenario.expected.bills[i]?.id)
        expect(bills[i]?.title).toBe(scenario.expected.bills[i]?.title)
        expect(bills[i]?.title).not.toContain(scenario.contract.contractCode)
        expect(bills[i]?.amount).toBe(scenario.expected.bills[i]?.amount)
        expect(bills[i]?.status).toBe(scenario.expected.bills[i]?.status)
      }

      // 3. Cost breakdown parity
      const breakdown = buildMonthlyCostBreakdown(contract, bills)
      expect(breakdown).toEqual(scenario.expected.costBreakdown)
    })
  }
})
