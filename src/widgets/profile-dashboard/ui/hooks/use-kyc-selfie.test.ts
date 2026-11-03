import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from 'sonner'

import { verifyKycFace } from '../../api/kyc-api'
import {
  describeFaceFailure,
  FACE_MISMATCH_MESSAGE,
  FACE_SPOOF_MESSAGE,
  useKycSelfie,
} from './use-kyc-selfie'

vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }))
vi.mock('../../api/kyc-api', () => ({ verifyKycFace: vi.fn() }))

const IMAGE = 'data:image/jpeg;base64,/9j/4AAQ'
const FACE_OK = {
  liveness: true,
  spoofScore: 0.1,
  match: true,
  distance: 0.4,
  threshold: 0.85,
}

function fileChange(): React.ChangeEvent<HTMLInputElement> {
  const file = new File(['x'], 'selfie.jpg', { type: 'image/jpeg' })
  return {
    target: { files: [file] },
  } as unknown as React.ChangeEvent<HTMLInputElement>
}

async function renderWithSelfie(onVerified = vi.fn(), maintenanceMode = false) {
  const hook = renderHook(() =>
    useKycSelfie({ frontPreview: IMAGE, maintenanceMode, onVerified })
  )
  vi.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(function (
    this: FileReader
  ) {
    Object.defineProperty(this, 'result', { value: IMAGE })
    this.onloadend?.(new ProgressEvent('loadend') as ProgressEvent<FileReader>)
  })
  await act(async () => hook.result.current.handleFile(fileChange()))
  return { ...hook, onVerified }
}

describe('describeFaceFailure', () => {
  it('reports spoof before mismatch and null when both pass', () => {
    expect(
      describeFaceFailure({ ...FACE_OK, liveness: false, match: false })
    ).toBe(FACE_SPOOF_MESSAGE)
    expect(describeFaceFailure({ ...FACE_OK, match: false })).toBe(
      FACE_MISMATCH_MESSAGE
    )
    expect(describeFaceFailure(FACE_OK)).toBeNull()
  })
})

describe('useKycSelfie', () => {
  beforeEach(() => vi.clearAllMocks())

  it('advances only when liveness and match both pass', async () => {
    vi.mocked(verifyKycFace).mockResolvedValue(FACE_OK)
    const { result, onVerified } = await renderWithSelfie()

    await act(async () => result.current.verify())

    expect(onVerified).toHaveBeenCalledOnce()
    expect(result.current.isFaceVerified).toBe(true)
    expect(result.current.faceError).toBe('')
  })

  it('blocks a mismatch, keeps the selfie, and allows a retry', async () => {
    vi.mocked(verifyKycFace).mockResolvedValueOnce({ ...FACE_OK, match: false })
    const { result, onVerified } = await renderWithSelfie()

    await act(async () => result.current.verify())
    expect(onVerified).not.toHaveBeenCalled()
    expect(result.current.faceError).toBe(FACE_MISMATCH_MESSAGE)
    expect(result.current.isFaceVerified).toBe(false)

    act(() => result.current.retake())
    expect(result.current.selfiePreview).toBe('')
    expect(result.current.faceError).toBe('')
  })

  it('blocks a spoofed selfie', async () => {
    vi.mocked(verifyKycFace).mockResolvedValue({
      ...FACE_OK,
      liveness: false,
      match: false,
    })
    const { result, onVerified } = await renderWithSelfie()

    await act(async () => result.current.verify())

    expect(onVerified).not.toHaveBeenCalled()
    expect(result.current.faceError).toBe(FACE_SPOOF_MESSAGE)
  })

  it('shows the user-fixable message from a 422', async () => {
    vi.mocked(verifyKycFace).mockRejectedValue(
      new Error('Không tìm thấy khuôn mặt')
    )
    const { result, onVerified } = await renderWithSelfie()

    await act(async () => result.current.verify())

    expect(onVerified).not.toHaveBeenCalled()
    expect(result.current.faceError).toBe('Không tìm thấy khuôn mặt')
  })

  it('shows a generic message on a non-Error outage and never passes', async () => {
    vi.mocked(verifyKycFace).mockRejectedValue('boom')
    const { result, onVerified } = await renderWithSelfie()

    await act(async () => result.current.verify())

    expect(onVerified).not.toHaveBeenCalled()
    expect(result.current.faceError).toContain('Không thể xác thực khuôn mặt')
    expect(result.current.isFaceVerified).toBe(false)
  })

  it('reports a denied camera permission', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { result } = renderHook(() =>
      useKycSelfie({
        frontPreview: IMAGE,
        maintenanceMode: false,
        onVerified: vi.fn(),
      })
    )

    await act(async () => result.current.startCamera())

    expect(toast.error).toHaveBeenCalledWith(
      'Không thể truy cập camera. Vui lòng cấp quyền.'
    )
    expect(result.current.isCameraActive).toBe(false)
  })

  it('sends nothing in maintenance mode', async () => {
    const { result } = await renderWithSelfie(vi.fn(), true)

    await act(async () => result.current.verify())

    expect(verifyKycFace).not.toHaveBeenCalled()
    expect(toast.error).toHaveBeenCalled()
  })
})
