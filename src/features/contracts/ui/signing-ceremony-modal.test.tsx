import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { SigningCeremonyModal } from './signing-ceremony-modal'

const { createSmartCaSigningSession } = vi.hoisted(() => ({
  createSmartCaSigningSession: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
  verifySigner: vi.fn(),
  createSmartCaSigningSession,
}))

describe('SigningCeremonyModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SigningCeremonyModal
        isOpen={false}
        onClose={vi.fn()}
        contractId="c1"
        contractCode="HD-101"
        signerName="Trần Thị Thuê"
        signerRole="tenant"
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders INTRO step and enables start button upon consent checkbox check', () => {
    render(
      <SigningCeremonyModal
        isOpen={true}
        onClose={vi.fn()}
        contractId="c1"
        contractCode="HD-101"
        signerName="Trần Thị Thuê"
        signerRole="tenant"
      />
    )

    expect(screen.getByTestId('signing-ceremony-modal')).toBeInTheDocument()
    expect(screen.getByText('Xác nhận ký số VNPT SmartCA')).toBeInTheDocument()
    expect(screen.getByText('HD-101')).toBeInTheDocument()

    const startBtn = screen.getByLabelText('Bắt đầu ký kết')
    expect(startBtn).toBeDisabled()

    const consentCheck = screen.getByLabelText('Xác nhận đồng thuận')
    fireEvent.click(consentCheck)

    expect(startBtn).not.toBeDisabled()
    fireEvent.click(startBtn)

    // Should transition to step 2 (FACE_VERIFY)
    expect(screen.getByTestId('face-verify-camera')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <SigningCeremonyModal
        isOpen={true}
        onClose={onClose}
        contractId="c1"
        contractCode="HD-101"
        signerName="Trần Thị Thuê"
        signerRole="tenant"
      />
    )

    const closeBtn = screen.getByLabelText('Đóng cửa sổ')
    fireEvent.click(closeBtn)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows an actionable rejected SmartCA session status without treating OTP as SmartCA', async () => {
    createSmartCaSigningSession.mockResolvedValueOnce({
      contractId: 'c1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-rejected-1',
      status: 'rejected',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })

    render(
      <SigningCeremonyModal
        isOpen={true}
        onClose={vi.fn()}
        contractId="c1"
        contractCode="HD-101"
        signerName="Tráº§n Thá»‹ ThuÃª"
        signerRole="tenant"
      />
    )

    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(screen.getByRole('button', { name: /VNPT SmartCA/i }))

    await waitFor(() => {
      expect(screen.getByTestId('smartca-session-status')).toHaveTextContent(
        'Bị từ chối'
      )
    })
    expect(
      screen.getByText(/OTP\/eKYC.*chỉ là xác thực hỗ trợ/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Mở lại phiên ký VNPT SmartCA/i })
    ).toBeInTheDocument()
  })

  it('keeps provider outage recoverable and exposes retry guidance', async () => {
    createSmartCaSigningSession.mockRejectedValueOnce(
      new Error('SMARTCA_PROVIDER_UNAVAILABLE')
    )

    render(
      <SigningCeremonyModal
        isOpen={true}
        onClose={vi.fn()}
        contractId="c1"
        contractCode="HD-101"
        signerName="Tráº§n Thá»‹ ThuÃª"
        signerRole="tenant"
      />
    )

    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(screen.getByRole('button', { name: /VNPT SmartCA/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'SMARTCA_PROVIDER_UNAVAILABLE'
      )
    })
    expect(
      screen.getByRole('button', { name: /Mở lại phiên ký VNPT SmartCA/i })
    ).toBeInTheDocument()
  })
})
