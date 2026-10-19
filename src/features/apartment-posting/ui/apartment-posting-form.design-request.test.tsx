import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { ApartmentPostingForm } from './apartment-posting-form'

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  createApartment: vi.fn(),
  createDesignRequest: vi.fn(),
  info: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
}))
vi.mock('../api/apartment-posting-api', () => ({
  createApartment: mocks.createApartment,
  updateApartment: vi.fn(),
  resubmitApartment: vi.fn(),
}))
vi.mock('@/features/design-requests', () => ({
  createDesignRequest: mocks.createDesignRequest,
}))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { info: mocks.info, success: vi.fn(), error: vi.fn() },
}))
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn().mockReturnValue('toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}))
vi.mock('../model/apartment-posting-schema', async () => {
  const { z } = await import('zod')
  return {
    apartmentPostingSchema: z.object({}).passthrough(),
    ensureRentalPackagesFallback: (_price: number, packages?: unknown[]) =>
      packages ?? [],
  }
})
vi.mock('./location-step', () => ({
  LocationStep: () => <div data-testid="step-1" />,
}))
vi.mock('./details-step', () => ({
  DetailsStep: () => <div data-testid="step-2" />,
}))
vi.mock('./media-step', () => ({
  MediaStep: ({
    form,
  }: {
    form: { setValue: (name: 'gallery', value: string[]) => void }
  }) => {
    React.useEffect(() => {
      form.setValue('gallery', ['https://example.com/a.jpg'])
    }, [form])
    return <div data-testid="step-3" />
  },
}))
vi.mock('./review-step', () => ({
  ReviewStep: ({ onSubmit }: { onSubmit: () => void }) => (
    <button type="button" onClick={onSubmit}>
      Gửi bài
    </button>
  ),
}))

async function goToReview(): Promise<void> {
  render(<ApartmentPostingForm />)
  for (const next of ['step-2', 'step-3']) {
    fireEvent.click(await screen.findByText('Tiếp tục'))
    await screen.findByTestId(next)
  }
  fireEvent.click(await screen.findByText('Tiếp tục'))
  await screen.findByText('Gửi bài')
}

describe('ApartmentPostingForm design request option', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.createApartment.mockResolvedValue({ id: 'apt-new' })
    mocks.createDesignRequest.mockResolvedValue({ id: 'req-1' })
  })

  it('does not create a design request unless opted in', async () => {
    await goToReview()
    fireEvent.click(screen.getByText('Gửi bài'))

    await waitFor(() => expect(mocks.push).toHaveBeenCalled())
    expect(mocks.createDesignRequest).not.toHaveBeenCalled()
  })

  it('creates the request after the apartment and keeps it out of the payload', async () => {
    await goToReview()
    expect(screen.getByText('Yêu cầu thiết kế 3D (tùy chọn)')).toBeTruthy()
    fireEvent.click(
      screen.getByLabelText('Gửi yêu cầu thiết kế 3D cho căn hộ này')
    )
    fireEvent.change(screen.getByLabelText('Mô tả yêu cầu thiết kế'), {
      target: { value: '  Phong cách Bắc Âu  ' },
    })
    fireEvent.click(screen.getByText('Gửi bài'))

    await waitFor(() =>
      expect(mocks.createDesignRequest).toHaveBeenCalledWith({
        apartmentId: 'apt-new',
        kind: 'create',
        brief: 'Phong cách Bắc Âu',
      })
    )
    const payload = mocks.createApartment.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >
    expect(Object.keys(payload)).not.toContain('brief')
    expect(JSON.stringify(payload)).not.toContain('Bắc Âu')
    expect(mocks.push).toHaveBeenCalledWith('/profile?tab=listings')
  })

  it('skips the request when the brief is empty', async () => {
    await goToReview()
    fireEvent.click(
      screen.getByLabelText('Gửi yêu cầu thiết kế 3D cho căn hộ này')
    )
    fireEvent.click(screen.getByText('Gửi bài'))

    await waitFor(() => expect(mocks.push).toHaveBeenCalled())
    expect(mocks.createDesignRequest).not.toHaveBeenCalled()
  })

  it('warns but still navigates when the design request fails', async () => {
    mocks.createDesignRequest.mockRejectedValue(new Error('boom'))
    await goToReview()
    fireEvent.click(
      screen.getByLabelText('Gửi yêu cầu thiết kế 3D cho căn hộ này')
    )
    fireEvent.change(screen.getByLabelText('Mô tả yêu cầu thiết kế'), {
      target: { value: 'Hiện đại' },
    })
    fireEvent.click(screen.getByText('Gửi bài'))

    await waitFor(() => expect(mocks.push).toHaveBeenCalled())
    expect(mocks.info).toHaveBeenCalledWith(
      'Đã đăng tin nhưng chưa gửi được yêu cầu thiết kế 3D — bạn có thể gửi lại trong tab Tin đăng.',
      expect.anything()
    )
  })
})
