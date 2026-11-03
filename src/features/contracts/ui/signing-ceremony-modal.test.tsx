import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SigningCeremonyModal } from './signing-ceremony-modal'

const {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSigningMethods,
  testSignContract,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  createSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  getSigningMethods: vi.fn(),
  testSignContract: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
  submitSmartCaV2Sign: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
  verifySigner: vi.fn(),
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSigningMethods,
  testSignContract,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
}))

const METHODS = [
  {
    id: 'smartca_v1',
    label: 'VNPT SmartCA (xác nhận trên app)',
    description: '',
    available: true,
    inputs: [],
  },
  {
    id: 'smartca_v2',
    label: 'VNPT SmartCA (mật khẩu + OTP)',
    description: '',
    available: true,
    inputs: ['smartCaPassword', 'smartCaOtp'],
  },
  {
    id: 'biometric_smart_otp',
    label: 'Sinh trắc học + Smart OTP',
    description: '',
    available: true,
    inputs: [],
  },
  {
    id: 'dev_sign',
    label: 'Ký thử nghiệm (dev)',
    description: '',
    available: true,
    inputs: [],
  },
]

const props = {
  isOpen: true,
  onClose: vi.fn(),
  contractId: 'c1',
  contractCode: 'HD-101',
  signerName: 'Trần Thị Thuê',
  signerRole: 'tenant' as const,
}

function renderModal() {
  return render(<SigningCeremonyModal {...props} />)
}

async function openSmartCaForm(): Promise<void> {
  await screen.findByRole('radio', { name: /xác nhận trên app/ })
  fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
  fireEvent.click(
    screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
  )
  await screen.findByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
}

function pendingSession(overrides: Record<string, unknown> = {}) {
  return {
    id: 'session-1',
    contractId: 'c1',
    signerId: 'tenant-1',
    signerRole: 'tenant',
    artifactHash: 'a'.repeat(64),
    providerTransactionId: 'sca-1',
    status: 'pending',
    documentId: 'contract-c1-r1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    ...overrides,
  }
}

describe('SigningCeremonyModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getSigningMethods.mockResolvedValue(METHODS)
    getSmartCaCertificates.mockResolvedValue({
      certificates: [
        {
          serialNumber: 'SERIAL-001',
          subject: 'CN=Test Tenant',
          issuer: 'CN=VNPT Test CA',
          validFrom: '2026-01-01T00:00:00.000Z',
          validTo: '2099-01-01T00:00:00.000Z',
        },
      ],
    })
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SigningCeremonyModal {...props} isOpen={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('preserves the face verification and internal Smart OTP ceremony', async () => {
    renderModal()
    fireEvent.click(await screen.findByRole('radio', { name: /Sinh trắc học/ }))

    expect(screen.getByTestId('signing-ceremony-modal')).toBeInTheDocument()
    expect(screen.getByText('Xác nhận ký số VNPT SmartCA')).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('radio', { name: /Sinh trắc học [+] Smart OTP/ })
    )
    const startButton = screen.getByLabelText('Bắt đầu ký kết')
    expect(startButton).toBeDisabled()

    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(startButton)

    expect(screen.getByTestId('face-verify-camera')).toBeInTheDocument()
  })

  it('never shows a SmartCA password or OTP field', async () => {
    renderModal()
    await openSmartCaForm()

    expect(screen.queryByLabelText('Mật khẩu SmartCA')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('OTP SmartCA')).not.toBeInTheDocument()
  })

  it('loads one certificate and submits a signing request without credentials', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    renderModal()

    await openSmartCaForm()
    // Giá trị gửi backend vẫn là serial đầy đủ; người dùng chỉ thấy nhãn rút gọn.
    expect(screen.getByLabelText('Chứng thư VNPT SmartCA')).toHaveValue(
      'SERIAL-001'
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )

    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledWith(
        'c1',
        expect.objectContaining({
          certificateSerial: 'SERIAL-001',
          idempotencyKey: expect.any(String),
        })
      )
    )
    expect(screen.getByTestId('smartca-session-status')).toHaveTextContent(
      'Đang chờ duyệt trong app VNPT SmartCA'
    )
  })

  it('requires explicit selection when multiple certificates are available', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({
      certificates: [
        { serialNumber: 'SERIAL-001', subject: 'CN=First' },
        { serialNumber: 'SERIAL-002', subject: 'CN=Second' },
      ],
    })
    renderModal()

    await openSmartCaForm()
    const selector = screen.getByLabelText('Chứng thư VNPT SmartCA')
    expect(selector).toHaveValue('')
    fireEvent.change(selector, { target: { value: 'SERIAL-002' } })
    expect(selector).toHaveValue('SERIAL-002')
  })

  it('renders empty and provider-error certificate states with retry action', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({ certificates: [] })
    renderModal()
    await screen.findByRole('radio', { name: /xác nhận trên app/ })
    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(
      screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không có chứng thư SmartCA hợp lệ'
    )

    getSmartCaCertificates.mockRejectedValueOnce(
      new Error('SMARTCA_PROVIDER_UNAVAILABLE')
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Thử tải lại chứng thư SmartCA' })
    )
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'SMARTCA_PROVIDER_UNAVAILABLE'
      )
    )
  })

  it('keeps one idempotency key across a transient failure retry', async () => {
    createSmartCaSigningSession
      .mockRejectedValueOnce(new Error('SMARTCA_PROVIDER_UNAVAILABLE'))
      .mockResolvedValueOnce(pendingSession())
    renderModal()
    await openSmartCaForm()

    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )
    await screen.findByText(/SMARTCA_PROVIDER_UNAVAILABLE/)

    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )
    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledTimes(2)
    )
    const firstKey = createSmartCaSigningSession.mock.calls[0]?.[1]
      ?.idempotencyKey as string
    const secondKey = createSmartCaSigningSession.mock.calls[1]?.[1]
      ?.idempotencyKey as string
    expect(secondKey).toBe(firstKey)
  })

  it('renders the signing options from the backend and defaults to the first available', async () => {
    renderModal()

    const group = await screen.findByRole('radiogroup', {
      name: 'Chọn phương thức ký',
    })
    expect(group).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(4)
    expect(
      screen.getByRole('radio', { name: /xác nhận trên app/ })
    ).toBeChecked()
    expect(screen.queryByLabelText('Mật khẩu SmartCA')).not.toBeInTheDocument()
  })

  it('shows SmartCA v2 password + OTP fields when selected, and submits them', async () => {
    submitSmartCaV2Sign.mockResolvedValue(pendingSession({ status: 'signed' }))
    renderModal()

    await screen.findByRole('radiogroup', { name: 'Chọn phương thức ký' })
    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(screen.getByRole('radio', { name: /mật khẩu \+ OTP/ }))

    fireEvent.change(await screen.findByLabelText('Mật khẩu SmartCA'), {
      target: { value: 'Secret@123' },
    })
    fireEvent.change(screen.getByLabelText('OTP SmartCA'), {
      target: { value: '123456' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )

    await waitFor(() =>
      expect(submitSmartCaV2Sign).toHaveBeenCalledWith(
        'c1',
        expect.objectContaining({
          smartCaPassword: 'Secret@123',
          smartCaOtp: '123456',
        })
      )
    )
  })

  it('does not show the dev sign option unless the backend returns it', async () => {
    getSigningMethods.mockResolvedValue(METHODS.slice(0, 1))
    renderModal()

    await screen.findByRole('radiogroup', { name: 'Chọn phương thức ký' })
    expect(screen.queryByRole('radio', { name: /dev/ })).not.toBeInTheDocument()
  })

  it('shows a retryable error when the options cannot be loaded', async () => {
    getSigningMethods.mockRejectedValueOnce(new Error('boom'))
    renderModal()

    expect(await screen.findByRole('alert')).toHaveTextContent('boom')
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    await waitFor(() => expect(getSigningMethods).toHaveBeenCalledTimes(2))
  })

  it('resets the SmartCA signing UI when the modal is closed and reopened', async () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <SigningCeremonyModal {...props} onClose={onClose} />
    )
    await openSmartCaForm()

    fireEvent.click(screen.getByLabelText('Đóng cửa sổ'))
    expect(onClose).toHaveBeenCalledTimes(1)
    rerender(
      <SigningCeremonyModal {...props} isOpen={false} onClose={onClose} />
    )
    rerender(<SigningCeremonyModal {...props} onClose={onClose} />)

    expect(
      screen.queryByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    ).not.toBeInTheDocument()
  })
})
