import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  flowReducer,
  useRentalApplicationFlow,
  type FlowState,
} from './use-rental-application-flow'
import {
  createRentalApplication,
  getRentalApplicationContext,
  type RentalApplicationItem,
} from '@/features/rental-application'
import { getLegalTermsVersion } from '@/features/legal-terms'

vi.mock('@/features/rental-application', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/features/rental-application')>()
  return {
    ...actual,
    createRentalApplication: vi.fn(),
    getRentalApplicationContext: vi.fn(),
    isRentalPackageStaleError: vi.fn(
      (err: unknown) =>
        err instanceof Error && err.message.includes('PACKAGE_STALE')
    ),
    isRentalTermsStaleError: vi.fn(
      (err: unknown) =>
        err instanceof Error && err.message.includes('TERMS_STALE')
    ),
  }
})

vi.mock('@/features/legal-terms', async importOriginal => {
  const actual = await importOriginal<typeof import('@/features/legal-terms')>()
  return {
    ...actual,
    getLegalTermsVersion: vi.fn(),
  }
})

const mockContext = {
  enabled: true,
  eligible: true,
  reasonCode: null,
  listing: {
    id: 'apt-1',
    title: 'Căn hộ River Park',
    address: '123 River Road',
    area: 75,
    status: 'available',
    landlordDisplayName: 'Nguyễn Văn A',
  },
  pricingRevision: 1,
  packages: [
    {
      packageId: 'pkg-6',
      version: 1,
      durationMonths: 6 as const,
      monthlyRent: 12000000,
      depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 1 },
      resolvedDepositAmount: 12000000,
      status: 'active' as const,
      currency: 'VND' as const,
    },
  ],
  disclosure: {
    version: 'disc-v1',
    hash: 'disc-hash',
    items: [
      { id: 'req-item', title: 'Tiêu chuẩn', body: 'Nội dung', required: true },
    ],
  },
  terms: {
    key: 'rental-terms-canonical',
    version: 2,
    hash: 'terms-hash-matching',
    url: '/terms',
  },
}

const mockTerms = {
  key: 'rental-terms-canonical',
  version: 2,
  title: 'Quy chế thuê nhà',
  summary: 'Tóm tắt',
  sections: [],
  contentHash: 'terms-hash-matching',
  publishedAt: '2026-09-01T00:00:00Z',
}

describe('use-rental-application-flow reducer & hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getRentalApplicationContext).mockResolvedValue(mockContext)
    vi.mocked(getLegalTermsVersion).mockResolvedValue(mockTerms)
  })

  describe('flowReducer isolated transitions', () => {
    const baseState: FlowState = {
      step: 1,
      apartmentId: 'apt-1',
      context: null,
      termsDoc: null,
      loadingContext: false,
      loadingTerms: false,
      submitting: false,
      error: null,
      termsError: null,
      details: {
        occupants: 1,
        moveInDate: '2030-01-01',
        occupation: 'Engineer',
        hasPets: false,
      },
      selectedPackageId: '',
      acknowledgedDisclosures: [],
      termsAccepted: false,
      submittedApplication: null,
    }

    it('toggles disclosures in and out', () => {
      let state = flowReducer(baseState, {
        type: 'TOGGLE_DISCLOSURE',
        id: 'd-1',
      })
      expect(state.acknowledgedDisclosures).toEqual(['d-1'])

      state = flowReducer(state, { type: 'TOGGLE_DISCLOSURE', id: 'd-1' })
      expect(state.acknowledgedDisclosures).toEqual([])
    })

    it('handles package stale transition: resets selectedPackageId and rollback to step 2', () => {
      const state = flowReducer(
        { ...baseState, step: 3, selectedPackageId: 'pkg-6', submitting: true },
        { type: 'HANDLE_PACKAGE_STALE', error: 'Gói thuê đã đổi' }
      )
      expect(state.step).toBe(2)
      expect(state.selectedPackageId).toBe('')
      expect(state.submitting).toBe(false)
      expect(state.error).toBe('Gói thuê đã đổi')
    })

    it('handles terms stale transition: resets termsAccepted and rollback to step 3', () => {
      const state = flowReducer(
        { ...baseState, step: 3, termsAccepted: true, submitting: true },
        { type: 'HANDLE_TERMS_STALE', error: 'Điều khoản đã đổi' }
      )
      expect(state.step).toBe(3)
      expect(state.termsAccepted).toBe(false)
      expect(state.submitting).toBe(false)
      expect(state.error).toBe('Điều khoản đã đổi')
    })

    it('handles submit success: transitions to step 4 with application item', () => {
      const mockApp = {
        _id: 'app-1',
        status: 'pending',
      } as unknown as RentalApplicationItem
      const state = flowReducer(
        { ...baseState, step: 3, submitting: true },
        { type: 'SUBMIT_SUCCESS', application: mockApp }
      )
      expect(state.step).toBe(4)
      expect(state.submittedApplication).toBe(mockApp)
      expect(state.submitting).toBe(false)
    })
  })

  describe('useRentalApplicationFlow hook integration', () => {
    it('loads context and terms on mount', async () => {
      const { result } = renderHook(() => useRentalApplicationFlow('apt-1'))

      expect(result.current.state.loadingContext).toBe(true)

      await waitFor(() => {
        expect(result.current.state.loadingContext).toBe(false)
      })

      expect(result.current.state.context).toEqual(mockContext)
      expect(result.current.state.termsDoc).toEqual(mockTerms)
      expect(result.current.state.selectedPackageId).toBe('pkg-6')
    })

    it('handles terms hash mismatch gracefully', async () => {
      vi.mocked(getLegalTermsVersion).mockResolvedValue({
        ...mockTerms,
        contentHash: 'mismatched-hash',
      })

      const { result } = renderHook(() => useRentalApplicationFlow('apt-1'))

      await waitFor(() => {
        expect(result.current.state.loadingContext).toBe(false)
      })

      expect(result.current.state.termsError).toBe(
        'Mã băm nội dung điều khoản không khớp với thỏa thuận yêu cầu thuê.'
      )
    })

    it('navigates through steps and submits application successfully', async () => {
      const mockCreated = {
        _id: 'app-created-123',
        status: 'pending',
        packageSnapshot: mockContext.packages[0],
      }
      vi.mocked(createRentalApplication).mockResolvedValue(
        mockCreated as unknown as RentalApplicationItem
      )

      const { result } = renderHook(() => useRentalApplicationFlow('apt-1'))

      await waitFor(() => {
        expect(result.current.state.loadingContext).toBe(false)
      })

      // Step 1 -> Step 2
      act(() => {
        result.current.actions.updateDetails({
          occupants: 2,
          moveInDate: '2030-01-01',
          occupation: 'Developer',
        })
      })

      act(() => {
        const ok = result.current.actions.goToStep2()
        expect(ok).toBe(true)
      })
      expect(result.current.state.step).toBe(2)

      // Step 2 -> Step 3
      act(() => {
        const ok = result.current.actions.goToStep3()
        expect(ok).toBe(true)
      })
      expect(result.current.state.step).toBe(3)

      // Step 3: check disclosures and accept terms
      act(() => {
        result.current.actions.toggleDisclosure('req-item')
        result.current.actions.setTermsAccepted(true)
      })

      // Submit
      await act(async () => {
        await result.current.actions.submitApplication()
      })

      expect(createRentalApplication).toHaveBeenCalledWith({
        apartmentId: 'apt-1',
        packageId: 'pkg-6',
        packageVersion: 1,
        occupants: 2,
        moveInDate: '2030-01-01',
        occupation: 'Developer',
        hasPets: false,
        notes: undefined,
        disclosureVersion: 'disc-v1',
        acknowledgedDisclosureIds: ['req-item'],
        acceptedTermsVersion: 2,
        acceptedTermsHash: 'terms-hash-matching',
      })

      expect(result.current.state.step).toBe(4)
      expect(result.current.state.submittedApplication).toEqual(mockCreated)
    })
  })
})
