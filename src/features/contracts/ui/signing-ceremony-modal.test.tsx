import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { SigningCeremonyModal } from './signing-ceremony-modal'

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
  verifySigner: vi.fn(),
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
})
