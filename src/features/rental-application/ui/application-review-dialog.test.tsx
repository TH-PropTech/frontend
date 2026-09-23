import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as React from 'react'
import { ApplicationReviewDialog } from './application-review-dialog'
import type { RentalApplicationItem } from '../api/rental-application-api'

const mockApp: RentalApplicationItem = {
  _id: 'app-999',
  apartmentId: 'apt-1',
  landlordId: 'landlord-1',
  tenantId: 'tenant-1',
  packageSnapshot: {
    packageId: 'pkg-1',
    version: 2,
    durationMonths: 12,
    monthlyRent: 12000000,
    resolvedDepositAmount: 12000000,
  },
  applicationRevision: 2,
  status: 'pending',
  reasonCode: null,
  actorId: null,
  actorTimestamp: null,
  occupants: 3,
  moveInDate: '2026-10-01',
  occupation: 'Kiến trúc sư',
  hasPets: true,
  notes: 'Có nuôi 1 chú mèo con sạch sẽ',
  createdAt: '2026-09-18T00:00:00.000Z',
  updatedAt: '2026-09-18T00:00:00.000Z',
}

describe('ApplicationReviewDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when application is null', () => {
    const { container } = render(
      <ApplicationReviewDialog
        application={null}
        open={true}
        onOpenChange={vi.fn()}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders dialog with application details when open', () => {
    render(
      <ApplicationReviewDialog
        application={mockApp}
        open={true}
        onOpenChange={vi.fn()}
      />
    )

    expect(screen.getByTestId('application-review-dialog')).toBeDefined()
    expect(screen.getByText(/thẩm định hồ sơ #/i)).toBeDefined()
    expect(screen.getByText('3 người')).toBeDefined()
    expect(screen.getByText('Kiến trúc sư')).toBeDefined()
    expect(screen.getByText('Có nuôi thú cưng')).toBeDefined()
    expect(screen.getByText(/"Có nuôi 1 chú mèo con sạch sẽ"/i)).toBeDefined()
    expect(screen.getByText('12 tháng')).toBeDefined()
  })

  it('submits approval with note', async () => {
    const onRespondMock = vi.fn().mockResolvedValue({})
    const onOpenChangeMock = vi.fn()

    render(
      <ApplicationReviewDialog
        application={mockApp}
        open={true}
        onOpenChange={onOpenChangeMock}
        onRespond={onRespondMock}
      />
    )

    const noteInput = screen.getByTestId('approve-note-input')
    fireEvent.change(noteInput, { target: { value: 'Hồ sơ đạt tiêu chuẩn!' } })

    const submitBtn = screen.getByTestId('submit-decision-btn')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(onRespondMock).toHaveBeenCalledWith({
        id: 'app-999',
        status: 'accepted',
        reasonCode: 'APPROVED',
        note: 'Hồ sơ đạt tiêu chuẩn!',
        expectedRevision: 2,
      })
      expect(onOpenChangeMock).toHaveBeenCalledWith(false)
    })
  })

  it('switches to reject mode and submits rejection with reason and note', async () => {
    const onRespondMock = vi.fn().mockResolvedValue({})
    const onOpenChangeMock = vi.fn()

    render(
      <ApplicationReviewDialog
        application={mockApp}
        open={true}
        onOpenChange={onOpenChangeMock}
        onRespond={onRespondMock}
      />
    )

    const rejectModeBtn = screen.getByTestId('mode-reject-btn')
    fireEvent.click(rejectModeBtn)

    expect(screen.getByTestId('reject-reason-select')).toBeDefined()

    const noteInput = screen.getByTestId('reject-note-input')
    fireEvent.change(noteInput, { target: { value: 'Tòa nhà cấm mèo' } })

    const submitBtn = screen.getByTestId('submit-decision-btn')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(onRespondMock).toHaveBeenCalledWith({
        id: 'app-999',
        status: 'rejected',
        reasonCode: 'PROPERTY_UNAVAILABLE',
        note: 'Tòa nhà cấm mèo',
        expectedRevision: 2,
      })
      expect(onOpenChangeMock).toHaveBeenCalledWith(false)
    })
  })

  it('shows readonly message when application is already resolved', () => {
    const resolvedApp: RentalApplicationItem = {
      ...mockApp,
      status: 'accepted',
    }

    render(
      <ApplicationReviewDialog
        application={resolvedApp}
        open={true}
        onOpenChange={vi.fn()}
      />
    )

    expect(screen.getByText(/hồ sơ này đã được xử lý/i)).toBeDefined()
    expect(screen.queryByTestId('submit-decision-btn')).toBeNull()
  })

  // ---------------------------------------------------------------------------
  // Policy Override Section Tests
  // ---------------------------------------------------------------------------
  describe('policy override section', () => {
    const policyDepositFirst = {
      policyId: 'pol-deposit-first',
      version: 1,
      strategy: 'DEPOSIT_FIRST' as const,
      contentHash: 'hash-df',
    }

    const policySignFirst = {
      policyId: 'pol-sign-first',
      version: 1,
      strategy: 'SIGN_FIRST' as const,
      contentHash: 'hash-sf',
    }

    it('does not render override section when allowedExecutionPolicies.length = 1', () => {
      const appWithOnePolicy: RentalApplicationItem = {
        ...mockApp,
        packageSnapshot: {
          ...mockApp.packageSnapshot!,
          allowedExecutionPolicies: [policyDepositFirst],
        },
      }

      render(
        <ApplicationReviewDialog
          application={appWithOnePolicy}
          open={true}
          onOpenChange={vi.fn()}
        />
      )

      expect(
        screen.queryByTestId('policy-override-section')
      ).not.toBeInTheDocument()
    })

    it('renders override section when allowedExecutionPolicies.length = 2', () => {
      const appWithTwoPolicies: RentalApplicationItem = {
        ...mockApp,
        packageSnapshot: {
          ...mockApp.packageSnapshot!,
          allowedExecutionPolicies: [policyDepositFirst, policySignFirst],
        },
      }

      render(
        <ApplicationReviewDialog
          application={appWithTwoPolicies}
          open={true}
          onOpenChange={vi.fn()}
        />
      )

      expect(screen.getByTestId('policy-override-section')).toBeInTheDocument()
      expect(screen.getByTestId('policy-override-keep')).toBeInTheDocument()
      expect(
        screen.getByRole('radio', {
          name: /Giữ nguyên lựa chọn của khách thuê/i,
        })
      ).toBeChecked()
      expect(
        screen.getByTestId('policy-override-SIGN_FIRST')
      ).toBeInTheDocument()
    })

    it('shows confirmation banner when landlord selects override policy and appends note on submit', async () => {
      const onRespondMock = vi.fn().mockResolvedValue({})
      const appWithTwoPolicies: RentalApplicationItem = {
        ...mockApp,
        packageSnapshot: {
          ...mockApp.packageSnapshot!,
          allowedExecutionPolicies: [policyDepositFirst, policySignFirst],
        },
        executionPolicySnapshot: policyDepositFirst,
      }

      render(
        <ApplicationReviewDialog
          application={appWithTwoPolicies}
          open={true}
          onOpenChange={vi.fn()}
          onRespond={onRespondMock}
        />
      )

      // Initially no confirmation banner
      expect(
        screen.queryByTestId('policy-override-confirmation')
      ).not.toBeInTheDocument()

      // Select SIGN_FIRST override
      const signFirstRadio = screen.getByTestId('policy-override-SIGN_FIRST')
      fireEvent.click(signFirstRadio)

      // Confirmation banner is now shown
      expect(
        screen.getByTestId('policy-override-confirmation')
      ).toBeInTheDocument()
      expect(screen.getByText(/Bạn đã đổi trình tự sang:/i)).toBeInTheDocument()

      // Submit approve
      const submitBtn = screen.getByTestId('submit-decision-btn')
      fireEvent.click(submitBtn)

      await waitFor(() => {
        expect(onRespondMock).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'app-999',
            status: 'accepted',
            note: expect.stringContaining(
              '[Chủ nhà đổi trình tự: Ký trước — đặt cọc sau]'
            ),
          })
        )
      })
    })
  })
})
