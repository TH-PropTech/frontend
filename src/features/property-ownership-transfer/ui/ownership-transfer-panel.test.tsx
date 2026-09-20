import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  applyOwnershipTransfer,
  previewOwnershipTransfer,
} from '../api/ownership-transfer-api'
import type {
  OwnershipTransferPreview,
  OwnershipTransferResult,
} from '../api/ownership-transfer-api'
import { OwnershipTransferPanel } from './ownership-transfer-panel'

vi.mock('../api/ownership-transfer-api', () => ({
  applyOwnershipTransfer: vi.fn(),
  mapOwnershipTransferError: vi.fn((error: Error) => ({
    status: 500,
    code: 'TEST_ERROR',
    message: error.message,
  })),
  previewOwnershipTransfer: vi.fn(),
}))

function createPreview(
  overrides: Partial<OwnershipTransferPreview> = {}
): OwnershipTransferPreview {
  return {
    transferId: 'transfer-1',
    targetUser: {
      id: 'target-1',
      email: 'owner@example.com',
      role: 'landlord',
    },
    sourceOwners: [{ userId: 'source-1', apartmentCount: 2 }],
    affectedCounts: {
      apartments: 2,
      openBookings: 1,
      openApplications: 1,
      contracts: 1,
      depositAgreements: 1,
      payments: 1,
      disputes: 0,
    },
    immutableCounts: {
      contracts: 1,
      depositAgreements: 1,
      payments: 1,
      disputes: 0,
    },
    conflicts: [],
    previewHash: `sha256:${'a'.repeat(64)}`,
    expiresAt: '2026-09-20T00:00:00.000Z',
    ...overrides,
  }
}

describe('OwnershipTransferPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('validates the target email before making a request', async () => {
    const user = userEvent.setup()
    render(<OwnershipTransferPanel />)

    await user.click(screen.getByTestId('ownership-transfer-preview-button'))

    expect(screen.getByRole('alert')).toHaveTextContent('email chủ nhà hợp lệ')
    expect(previewOwnershipTransfer).not.toHaveBeenCalled()
  })

  it('renders an empty preview without exposing an apply action', async () => {
    vi.mocked(previewOwnershipTransfer).mockResolvedValue(
      createPreview({
        affectedCounts: {
          apartments: 0,
          openBookings: 0,
          openApplications: 0,
          contracts: 0,
          depositAgreements: 0,
          payments: 0,
          disputes: 0,
        },
      })
    )
    const user = userEvent.setup()
    render(<OwnershipTransferPanel />)

    await user.type(
      screen.getByLabelText('Email chủ nhà kế nhiệm'),
      'owner@example.com'
    )
    await user.click(screen.getByTestId('ownership-transfer-preview-button'))

    expect(screen.getByText(/Không có căn hộ cần chuyển/)).toBeInTheDocument()
    expect(
      screen.queryByTestId('ownership-transfer-confirm-open')
    ).not.toBeInTheDocument()
  })

  it('renders conflicts and keeps apply disabled', async () => {
    vi.mocked(previewOwnershipTransfer).mockResolvedValue(
      createPreview({
        conflicts: [
          {
            code: 'UNKNOWN_SOURCE_OWNER',
            entityType: 'apartment',
            entityId: 'apartment-1',
            message: 'Apartment landlord does not resolve to an existing user.',
          },
        ],
      })
    )
    const user = userEvent.setup()
    render(<OwnershipTransferPanel />)

    await user.type(
      screen.getByLabelText('Email chủ nhà kế nhiệm'),
      'owner@example.com'
    )
    await user.click(screen.getByTestId('ownership-transfer-preview-button'))

    expect(screen.getByText(/chưa thể apply/)).toBeInTheDocument()
    expect(
      screen.queryByTestId('ownership-transfer-confirm-open')
    ).not.toBeInTheDocument()
  })

  it('requires an accessible destructive confirmation and shows the final audit reference', async () => {
    vi.mocked(previewOwnershipTransfer).mockResolvedValue(createPreview())
    const result: OwnershipTransferResult = {
      ...createPreview(),
      status: 'completed',
      idempotencyKey: 'admin-transfer-transfer-1',
      completedAt: '2026-09-19T00:00:00.000Z',
      auditRecordCount: 7,
    }
    vi.mocked(applyOwnershipTransfer).mockResolvedValue(result)
    const user = userEvent.setup()
    render(<OwnershipTransferPanel />)

    await user.type(
      screen.getByLabelText('Email chủ nhà kế nhiệm'),
      'owner@example.com'
    )
    await user.click(screen.getByTestId('ownership-transfer-preview-button'))
    await user.click(screen.getByTestId('ownership-transfer-confirm-open'))

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Quay lại kiểm tra' })
    ).toHaveFocus()
    await user.click(screen.getByTestId('ownership-transfer-confirm-submit'))

    expect(applyOwnershipTransfer).toHaveBeenCalledWith(
      'transfer-1',
      `sha256:${'a'.repeat(64)}`,
      'admin-transfer-transfer-1'
    )
    expect(screen.getByText('Transfer đã hoàn tất')).toBeInTheDocument()
    expect(screen.getByText(/transfer-1/)).toBeInTheDocument()
  })
})
