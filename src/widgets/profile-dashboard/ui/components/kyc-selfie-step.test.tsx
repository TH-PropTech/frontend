import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { KycSelfieStep } from './kyc-selfie-step'

function renderStep(
  overrides: Partial<React.ComponentProps<typeof KycSelfieStep>> = {}
) {
  const props: React.ComponentProps<typeof KycSelfieStep> = {
    selfiePreview: '',
    isCameraActive: false,
    isVerifying: false,
    faceError: '',
    maintenanceMode: false,
    videoRef: React.createRef<HTMLVideoElement>(),
    fileInputRef: React.createRef<HTMLInputElement>(),
    startCamera: vi.fn(),
    capture: vi.fn(),
    retake: vi.fn(),
    handleFile: vi.fn(),
    verify: vi.fn(),
    onBack: vi.fn(),
    ...overrides,
  }
  render(<KycSelfieStep {...props} />)
  return props
}

describe('KycSelfieStep', () => {
  it('starts empty: camera and upload offered, verify disabled, consent shown', () => {
    const props = renderStep()

    expect(screen.getByRole('button', { name: /Mở camera/ })).toBeEnabled()
    expect(
      screen.getByRole('button', { name: 'Xác thực khuôn mặt' })
    ).toBeDisabled()
    expect(screen.getByText(/lưu mã hóa/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Mở camera/ }))
    expect(props.startCamera).toHaveBeenCalledOnce()
  })

  it('with a selfie: verify enabled, retake offered, error announced', () => {
    const props = renderStep({
      selfiePreview: 'data:image/jpeg;base64,xx',
      faceError: 'Khuôn mặt không khớp với ảnh trên CCCD.',
    })

    expect(screen.getByRole('alert')).toHaveTextContent('không khớp')
    fireEvent.click(screen.getByRole('button', { name: /Chụp lại/ }))
    expect(props.retake).toHaveBeenCalledOnce()
    fireEvent.click(screen.getByRole('button', { name: 'Xác thực khuôn mặt' }))
    expect(props.verify).toHaveBeenCalledOnce()
  })

  it('shows the face guide only while the camera is live', () => {
    renderStep({ isCameraActive: true })
    expect(
      screen.getByText('Đặt khuôn mặt vào khung, nhìn thẳng, đủ sáng')
    ).toBeInTheDocument()
  })

  it('has no face guide before the camera starts', () => {
    renderStep()
    expect(screen.queryByText(/Đặt khuôn mặt vào khung/)).toBeNull()
  })

  it('locks capture in maintenance mode and shows progress while verifying', () => {
    renderStep({ maintenanceMode: true })
    expect(screen.getByRole('status')).toHaveTextContent('tạm bảo trì')
    expect(screen.getByRole('button', { name: /Mở camera/ })).toBeDisabled()
  })

  it('shows a busy status while verifying', () => {
    renderStep({
      selfiePreview: 'data:image/jpeg;base64,xx',
      isVerifying: true,
    })
    expect(screen.getByRole('status')).toHaveTextContent('Đang đối chiếu')
  })
})
