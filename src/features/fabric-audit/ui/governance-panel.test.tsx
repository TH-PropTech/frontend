import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import { resolveFabricAuditCapability } from '../model/capabilities'
import {
  buildGovernancePage,
  buildGovernanceSnapshot,
  buildGovernanceVerification,
} from '../test-fixtures/fabric-audit.fixtures'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { GovernancePanel } from './governance-panel'

const api = vi.hoisted(() => ({
  listGovernanceSnapshots: vi.fn(),
  verifyGovernanceSnapshot: vi.fn(),
  publishGovernanceSnapshot: vi.fn(),
}))
vi.mock('../api/fabric-audit-api', () => api)

const ADMIN = resolveFabricAuditCapability(['admin'])
const STAFF = resolveFabricAuditCapability(['staff'])
const SNAPSHOT_ID = '66f0000000000000000000b1'

beforeEach(() => {
  vi.clearAllMocks()
  api.listGovernanceSnapshots.mockResolvedValue(buildGovernancePage())
})

describe('GovernancePanel list', () => {
  it('shows loading, then snapshots with version and ledger status', async () => {
    api.listGovernanceSnapshots.mockReturnValue(new Promise(() => undefined))
    const { unmount } = renderWithQuery(<GovernancePanel capability={STAFF} />)
    expect(
      screen.getByRole('status', { name: 'Đang tải governance snapshot' })
    ).toBeInTheDocument()
    unmount()

    api.listGovernanceSnapshots.mockResolvedValue(buildGovernancePage())
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    const table = await screen.findByRole('table', {
      name: 'Governance snapshot',
    })
    const row = within(table).getAllByRole('row')[1]
    expect(row).toHaveTextContent('GOV-000001')
    expect(row).toHaveTextContent('v1')
    expect(row).toHaveTextContent('Đã ghi lên Fabric')
  })

  it('labels simulation and failed snapshots truthfully', async () => {
    api.listGovernanceSnapshots.mockResolvedValue(
      buildGovernancePage([
        buildGovernanceSnapshot({
          ledgerStatus: 'confirmed-simulation',
          blockNumber: null,
        }),
        buildGovernanceSnapshot({
          id: '66f0000000000000000000b2',
          snapshotCode: 'GOV-000002',
          ledgerStatus: 'failed-terminal',
        }),
      ])
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    const table = await screen.findByRole('table', {
      name: 'Governance snapshot',
    })
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows[0]).toHaveTextContent('Mô phỏng')
    expect(rows[1]).toHaveTextContent('Thất bại (terminal)')
  })

  it('shows an error with retry and an explicit empty state', async () => {
    const user = userEvent.setup()
    api.listGovernanceSnapshots.mockRejectedValueOnce(new Error('boom'))
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Không thể')
    api.listGovernanceSnapshots.mockResolvedValue(buildGovernancePage([]))
    await user.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(
      await screen.findByText('Chưa có governance snapshot nào được phát hành.')
    ).toBeInTheDocument()
  })
})

describe('GovernancePanel verification', () => {
  it('requests a live verification and shows a verified result', async () => {
    const user = userEvent.setup()
    api.verifyGovernanceSnapshot.mockResolvedValue(
      buildGovernanceVerification()
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await user.click(
      await screen.findByRole('button', { name: 'Xác minh với Fabric' })
    )
    expect(api.verifyGovernanceSnapshot).toHaveBeenCalledWith(SNAPSHOT_ID)
    expect(
      await screen.findByTestId('governance-verification')
    ).toHaveTextContent('Đã xác minh')
  })

  it('reports a mismatch with the differing fields, distinct from unavailable', async () => {
    const user = userEvent.setup()
    api.verifyGovernanceSnapshot.mockResolvedValue(
      buildGovernanceVerification({
        status: 'mismatch',
        mismatchFields: ['manifestHash'],
        ledgerManifestHash: 'e'.repeat(64),
      })
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await user.click(
      await screen.findByRole('button', { name: 'Xác minh với Fabric' })
    )
    const result = await screen.findByTestId('governance-verification')
    expect(result).toHaveTextContent('Sai lệch')
    expect(result).toHaveTextContent('manifestHash')
  })

  it('reports unavailable (not mismatch) with the stable reason', async () => {
    const user = userEvent.setup()
    api.verifyGovernanceSnapshot.mockResolvedValue(
      buildGovernanceVerification({
        status: 'unavailable',
        networkMode: 'simulation',
        ledgerManifestHash: null,
        reason: 'FABRIC_SIMULATION_MODE',
      })
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await user.click(
      await screen.findByRole('button', { name: 'Xác minh với Fabric' })
    )
    const result = await screen.findByTestId('governance-verification')
    expect(result).toHaveTextContent('Không khả dụng')
    expect(result).not.toHaveTextContent('Sai lệch')
    expect(result).toHaveTextContent('Chế độ mô phỏng')
  })

  it('reports a snapshot the ledger has not recorded yet', async () => {
    const user = userEvent.setup()
    api.verifyGovernanceSnapshot.mockResolvedValue(
      buildGovernanceVerification({
        status: 'not-recorded',
        ledgerManifestHash: null,
      })
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await user.click(
      await screen.findByRole('button', { name: 'Xác minh với Fabric' })
    )
    expect(
      await screen.findByTestId('governance-verification')
    ).toHaveTextContent('Chưa ghi nhận')
  })

  it('shows a readable error when verification fails', async () => {
    const user = userEvent.setup()
    api.verifyGovernanceSnapshot.mockRejectedValue(
      new ApiClientError('nf', 404, {
        code: 'HTTP_404',
        message: 'nf',
        details: { code: 'GOVERNANCE_SNAPSHOT_NOT_FOUND' },
      })
    )
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await user.click(
      await screen.findByRole('button', { name: 'Xác minh với Fabric' })
    )
    expect(
      await screen.findByTestId('governance-verification-error')
    ).toHaveTextContent('Không tìm thấy governance snapshot')
  })
})

describe('GovernancePanel publication (operator only)', () => {
  it('hides publication from staff', async () => {
    renderWithQuery(<GovernancePanel capability={STAFF} />)
    await screen.findByRole('table', { name: 'Governance snapshot' })
    expect(
      screen.queryByRole('button', { name: 'Phát hành snapshot mới' })
    ).not.toBeInTheDocument()
  })

  it('publishes for an admin and refreshes the list', async () => {
    const user = userEvent.setup()
    api.publishGovernanceSnapshot.mockResolvedValue({
      created: true,
      snapshot: buildGovernanceSnapshot(),
    })
    renderWithQuery(<GovernancePanel capability={ADMIN} />)
    await screen.findByRole('table', { name: 'Governance snapshot' })
    const callsBefore = api.listGovernanceSnapshots.mock.calls.length
    await user.click(
      screen.getByRole('button', { name: 'Phát hành snapshot mới' })
    )
    expect(
      await screen.findByText(/Đã phát hành GOV-000001/)
    ).toBeInTheDocument()
    await waitFor(() =>
      expect(api.listGovernanceSnapshots.mock.calls.length).toBeGreaterThan(
        callsBefore
      )
    )
  })

  it('says when the manifest is unchanged and no version was created', async () => {
    const user = userEvent.setup()
    api.publishGovernanceSnapshot.mockResolvedValue({
      created: false,
      snapshot: buildGovernanceSnapshot(),
    })
    renderWithQuery(<GovernancePanel capability={ADMIN} />)
    await user.click(
      await screen.findByRole('button', { name: 'Phát hành snapshot mới' })
    )
    expect(await screen.findByText(/không đổi/)).toBeInTheDocument()
  })

  it('maps incomplete-source errors', async () => {
    const user = userEvent.setup()
    api.publishGovernanceSnapshot.mockRejectedValue(
      new ApiClientError('x', 422, {
        code: 'HTTP_422',
        message: 'x',
        details: { code: 'GOVERNANCE_SNAPSHOT_INCOMPLETE' },
      })
    )
    renderWithQuery(<GovernancePanel capability={ADMIN} />)
    await user.click(
      await screen.findByRole('button', { name: 'Phát hành snapshot mới' })
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Chưa đủ nguồn quản trị'
    )
  })
})
