import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AdminDashboard, resolveAdminTab } from './admin-dashboard'
import {
  StaffOperationsDashboard,
  resolveStaffTab,
} from './staff-operations-dashboard'

const navigation = vi.hoisted(() => ({
  pathname: '/admin/fabric-audit',
  push: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push }),
}))
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))
vi.mock('@/shared/ui/logo', () => ({ Logo: () => <span>logo</span> }))
vi.mock('@/features/fabric-audit', () => ({
  FabricAuditCenter: () => <div data-testid="fabric-audit-center" />,
}))
vi.mock('@/features/property-ownership-transfer', () => ({
  OwnershipTransferPanel: () => null,
}))
vi.mock('@/features/contract-layouts', () => ({
  LayoutProfileEditor: () => null,
}))
vi.mock('@/features/platform-fees', () => ({
  FeeRevenueReport: () => null,
  FeeScheduleEditor: () => null,
}))
vi.mock('@/features/rental-transactions', () => ({
  StuckTransactionsView: () => null,
}))

vi.mock('./views/overview-view', () => ({ OverviewView: () => null }))
vi.mock('./views/contract-monitor-view', () => ({
  ContractMonitorView: () => null,
}))
vi.mock('./views/ai-consultation-view', () => ({
  AiConsultationView: () => null,
}))
vi.mock('./views/permission-matrix-view', () => ({
  PermissionMatrixView: () => null,
}))
vi.mock('./views/policies-view', () => ({ PoliciesView: () => null }))
vi.mock('./views/rental-flow-control-view', () => ({
  RentalFlowControlView: () => null,
}))
vi.mock('./views/recommendation-engine-view', () => ({
  RecommendationEngineView: () => null,
}))
vi.mock('./views/home-view', () => ({ HomeView: () => null }))
vi.mock('./views/property-approvals-view', () => ({
  PropertyApprovalsView: () => null,
}))
vi.mock('./views/kyc-approvals-view', () => ({ KycApprovalsView: () => null }))
vi.mock('./views/schedules-view', () => ({ SchedulesView: () => null }))
vi.mock('./views/disputes-view', () => ({ DisputesView: () => null }))
vi.mock('./views/community-view', () => ({ CommunityView: () => null }))
vi.mock('./views/safety-reports-view', () => ({
  SafetyReportsView: () => null,
}))
vi.mock('./views/support-queue-view', () => ({ SupportQueueView: () => null }))
vi.mock('./views/apartment-management-view', () => ({
  ApartmentManagementView: () => null,
}))

const ADMIN = { name: 'Admin', email: 'admin@example.test', roles: ['admin'] }
const STAFF = { name: 'Staff', email: 'staff@example.test', roles: ['staff'] }

beforeEach(() => {
  vi.clearAllMocks()
  navigation.pathname = '/admin/fabric-audit'
})

describe('route resolution', () => {
  it('resolves the Fabric Audit section for admin and staff dashboards', () => {
    expect(resolveAdminTab('/admin/fabric-audit')).toBe('fabric-audit')
    expect(resolveStaffTab('/admin/fabric-audit')).toBe('fabric-audit')
  })

  it('keeps unknown sections falling back to overview', () => {
    expect(resolveAdminTab('/admin/unknown')).toBe('overview')
    expect(resolveStaffTab('/admin/unknown')).toBe('overview')
  })
})

describe.each([
  ['admin', AdminDashboard, ADMIN],
  ['staff', StaffOperationsDashboard, STAFF],
])('%s dashboard Fabric Audit navigation', (_label, Dashboard, user) => {
  it('lists the audit center in the sidebar and opens its route', async () => {
    navigation.pathname = '/admin/overview'
    const userEventSession = userEvent.setup()
    render(<Dashboard initialUser={user} />)

    await userEventSession.click(
      screen.getByRole('button', { name: 'Fabric Audit Center' })
    )
    expect(navigation.push).toHaveBeenCalledWith('/admin/fabric-audit')
  })

  it('renders the audit center and its title on the audit route', () => {
    render(<Dashboard initialUser={user} />)
    expect(screen.getByTestId('fabric-audit-center')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Fabric Audit Center' })
    ).toBeInTheDocument()
  })

  it('does not render the audit center on other routes', () => {
    navigation.pathname = '/admin/overview'
    render(<Dashboard initialUser={user} />)
    expect(screen.queryByTestId('fabric-audit-center')).not.toBeInTheDocument()
  })
})
