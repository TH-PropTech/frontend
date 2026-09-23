import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LivingCostProfilesList } from './living-cost-profiles-list'

const mocks = vi.hoisted(() => ({
  getProfiles: vi.fn(),
  deleteProfile: vi.fn(),
  successToast: vi.fn(),
  errorToast: vi.fn(),
}))

vi.mock('../api/living-cost-api', () => ({
  getLivingCostProfiles: mocks.getProfiles,
  deleteLivingCostProfile: mocks.deleteProfile,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: mocks.successToast,
    error: mocks.errorToast,
    info: vi.fn(),
  },
}))

describe('LivingCostProfilesList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading and empty states', async () => {
    let resolve: (value: { items: never[]; total: number }) => void = () => {}
    mocks.getProfiles.mockReturnValue(
      new Promise(value => {
        resolve = value
      })
    )

    render(<LivingCostProfilesList />)
    expect(screen.getByText(/Äang táº£i há»“ sÆ¡/i)).toBeInTheDocument()

    resolve({ items: [], total: 0 })
    await waitFor(() => {
      expect(screen.getByText(/ChÆ°a cÃ³ há»“ sÆ¡/i)).toBeInTheDocument()
    })
  })

  it('renders a profile and removes it after a successful delete', async () => {
    mocks.getProfiles.mockResolvedValue({
      items: [
        {
          _id: 'profile-1',
          name: 'NhÃ  gáº§n cÃ´ng ty',
          totalEstimate: { mid: 12_000_000 },
        },
      ],
      total: 1,
    })
    mocks.deleteProfile.mockResolvedValue(undefined)

    render(<LivingCostProfilesList />)
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mocks.deleteProfile).toHaveBeenCalledWith('profile-1')
      expect(mocks.successToast).toHaveBeenCalled()
      expect(
        screen.queryByRole('heading', { level: 3 })
      ).not.toBeInTheDocument()
    })
  })

  it('shows a shared error toast when profile loading fails', async () => {
    mocks.getProfiles.mockRejectedValue(new Error('Profiles unavailable'))

    render(<LivingCostProfilesList />)

    await waitFor(() => {
      expect(mocks.errorToast).toHaveBeenCalledWith('Profiles unavailable')
      expect(screen.getByText('Profiles unavailable')).toBeInTheDocument()
    })
  })
})
