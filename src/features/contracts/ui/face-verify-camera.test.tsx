import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { FaceVerifyCamera } from './face-verify-camera'
import * as contractsApi from '../api/contracts-api'

vi.mock('../api/contracts-api', () => ({
  verifySigner: vi.fn(),
}))

describe('FaceVerifyCamera', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const stopMock = vi.fn()
    const mockMediaStream = {
      getTracks: () => [{ stop: stopMock }],
    }
    Object.assign(navigator, {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue(mockMediaStream),
      },
    })
  })

  it('renders webcam preview frame and capture controls', async () => {
    render(<FaceVerifyCamera contractId="c1" onVerified={vi.fn()} />)
    expect(
      screen.getByText(/Bước 1: Đối soát sinh trắc học khuôn mặt/i)
    ).toBeInTheDocument()
    expect(screen.getByTestId('face-verify-camera')).toBeInTheDocument()
    expect(screen.getByLabelText('Chụp ảnh đối soát')).toBeInTheDocument()
  })

  it('supports fallback image file upload', async () => {
    render(<FaceVerifyCamera contractId="c1" onVerified={vi.fn()} />)
    const file = new File(['dummy'], 'selfie.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText('Tải ảnh selfie từ máy')

    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByLabelText('Xác nhận đối soát')).toBeInTheDocument()
    })
  })

  it('calls verifySigner and triggers onVerified when verified is true', async () => {
    vi.mocked(contractsApi.verifySigner).mockResolvedValue({
      verified: true,
      faceMatch: true,
      liveness: true,
      spoofScore: 0.95,
      biometricEvidenceId: 'bio-token-123',
    })

    const onVerified = vi.fn()
    render(<FaceVerifyCamera contractId="c1" onVerified={onVerified} />)

    const file = new File(['dummy'], 'selfie.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText('Tải ảnh selfie từ máy')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByLabelText('Xác nhận đối soát')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('Xác nhận đối soát'))

    await waitFor(() => {
      expect(contractsApi.verifySigner).toHaveBeenCalledWith(
        'c1',
        expect.any(File)
      )
      expect(onVerified).toHaveBeenCalledWith('bio-token-123')
    })
  })

  it('displays error when face does not match', async () => {
    vi.mocked(contractsApi.verifySigner).mockResolvedValue({
      verified: false,
      faceMatch: false,
      liveness: true,
      spoofScore: 0.2,
    })

    render(<FaceVerifyCamera contractId="c1" onVerified={vi.fn()} />)

    const file = new File(['dummy'], 'selfie.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText('Tải ảnh selfie từ máy')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByLabelText('Xác nhận đối soát')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('Xác nhận đối soát'))

    await waitFor(() => {
      expect(
        screen.getByText(/Khuôn mặt không khớp với ảnh CCCD trong hồ sơ KYC/i)
      ).toBeInTheDocument()
    })
  })
})
