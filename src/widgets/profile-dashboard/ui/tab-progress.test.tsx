import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { UseProfileReturn } from '../model/use-profile'
import { TabProgress } from './tab-progress'

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
vi.mock('@/features/move-out-settlement', () => ({
  MoveOutPanel: (props: {
    contractId: string
    role: string
    depositAmount: number
  }) => (
    <div data-testid="move-out-panel-stub">{`${props.contractId}|${props.role}|${props.depositAmount}`}</div>
  ),
}))

const makeProfile = (
  overrides: Record<string, unknown> = {}
): UseProfileReturn =>
  ({
    role: 'tenant',
    activePropertyId: 'p1',
    properties: [
      {
        id: 'p1',
        name: 'Căn A',
        code: 'C-1',
        status: 'Đang thuê',
        price: 10,
        contractId: 'c1',
      },
    ],
    activeProperty: {
      id: 'p1',
      name: 'Căn A',
      code: 'C-1',
      status: 'Đang thuê',
      price: 10,
      contractId: 'c1',
    },
    progressPercent: () => 100,
    depositPaid: true,
    contractSigned: true,
    firstMonthPaid: true,
    handoverSigned: true,
    leaseTerminated: false,
    appointments: [],
    portfolio: { isLive: false },
    tenantPortfolio: {
      isLive: true,
      isLoading: false,
      isError: false,
      contracts: [{ _id: 'c1', propertyId: 'p1', deposit: 9_000_000 }],
      activeContract: null,
    },
    setActiveTab: vi.fn(),
    ...overrides,
  }) as unknown as UseProfileReturn

describe('TabProgress move-out wiring', () => {
  it('mounts the real move-out flow once the lease is active and has no mock terminate button', () => {
    render(<TabProgress profile={makeProfile()} />)
    expect(screen.getByTestId('move-out-panel-stub').textContent).toBe(
      'c1|tenant|9000000'
    )
    expect(screen.queryByText(/Yêu cầu thanh lý hợp đồng/)).toBeNull()
    expect(screen.queryByText(/Xác nhận thanh lý/)).toBeNull()
  })

  it('does not mount the flow before the handover is signed', () => {
    render(<TabProgress profile={makeProfile({ handoverSigned: false })} />)
    expect(screen.queryByTestId('move-out-panel-stub')).toBeNull()
  })

  it('keeps the flow visible after the lease ended, with plain wording and no banned terms', () => {
    render(<TabProgress profile={makeProfile({ leaseTerminated: true })} />)
    expect(screen.getByTestId('move-out-panel-stub')).toBeDefined()
    expect(screen.getByText('Hợp đồng thuê nhà đã kết thúc')).toBeDefined()
    expect(document.body.textContent ?? '').not.toMatch(/escrow|ký quỹ/i)
  })

  it('hides the flow when the property has no real contract (demo data)', () => {
    render(
      <TabProgress
        profile={makeProfile({
          tenantPortfolio: {
            isLive: true,
            isLoading: false,
            isError: false,
            contracts: [],
            activeContract: null,
          },
          activeProperty: {
            id: 'p1',
            name: 'Căn A',
            code: 'C-1',
            status: 'Đang thuê',
            price: 10,
          },
        })}
      />
    )
    expect(screen.queryByTestId('move-out-panel-stub')).toBeNull()
  })
})
