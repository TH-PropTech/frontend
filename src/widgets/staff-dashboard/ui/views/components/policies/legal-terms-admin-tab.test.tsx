import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LegalTermsAdminTab } from './legal-terms-admin-tab'
import * as api from '@/features/legal-terms/api/legal-terms-api'
import * as legalSourcesApi from '@/features/contracts/api/legal-sources-api'
import { ApiClientError } from '@/shared/api'

vi.mock('@/features/legal-terms/api/legal-terms-api', async () => {
  const actual = await vi.importActual<typeof api>(
    '@/features/legal-terms/api/legal-terms-api'
  )
  return {
    ...actual,
    getAdminLegalTermsState: vi.fn(),
    saveLegalTermsDraft: vi.fn(),
    publishLegalTerms: vi.fn(),
    submitTermsForReview: vi.fn(),
    approveTerms: vi.fn(),
    requestTermsChanges: vi.fn(),
  }
})

vi.mock('@/features/contracts/api/legal-sources-api', () => ({
  getAdminLegalSources: vi.fn(),
}))

const published: api.PublicLegalTermsResponse = {
  key: 'rental-service-terms',
  version: 1,
  title: 'Điều khoản đang áp dụng',
  summary: 'Tóm tắt.',
  contentHash: 'a'.repeat(64),
  publishedAt: '2026-09-13T00:00:00.000Z',
  effectiveFrom: '2026-09-14T00:00:00.000Z',
  sections: [{ id: 'sec-1', heading: '1. A', body: 'B', order: 1 }],
}

function makeState(
  draft: Partial<NonNullable<api.AdminLegalTermsStateResponse['draft']>> = {},
  extra: Partial<api.AdminLegalTermsStateResponse> = {}
): api.AdminLegalTermsStateResponse {
  return {
    published,
    draft: {
      key: 'rental-service-terms',
      title: 'Bản nháp',
      summary: 'Tóm tắt nháp',
      draftRevision: 4,
      updatedAt: '2026-09-13T01:00:00.000Z',
      reviewStatus: 'editing',
      sections: [{ id: 'sec-1', heading: '1. A', body: 'B', order: 1 }],
      ...draft,
    },
    ...extra,
  }
}

function setState(state: api.AdminLegalTermsStateResponse): void {
  vi.mocked(api.getAdminLegalTermsState).mockResolvedValue(state)
}

describe('LegalTermsAdminTab review workflow', () => {
  beforeEach(() => {
    vi.mocked(legalSourcesApi.getAdminLegalSources).mockResolvedValue([])
    vi.mocked(api.submitTermsForReview).mockResolvedValue({
      success: true,
      draftRevision: 4,
      reviewStatus: 'in_review',
    })
    vi.mocked(api.approveTerms).mockResolvedValue({
      success: true,
      draftRevision: 4,
      reviewStatus: 'approved',
    })
    vi.mocked(api.requestTermsChanges).mockResolvedValue({
      success: true,
      draftRevision: 4,
      reviewStatus: 'editing',
    })
    vi.mocked(api.publishLegalTerms).mockResolvedValue({
      ...published,
      version: 2,
    })
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('highlights the current step in the status bar', async () => {
    setState(makeState({ reviewStatus: 'in_review' }))
    render(<LegalTermsAdminTab />)
    const bar = await screen.findByTestId('terms-review-bar')
    const current = bar.querySelector('[aria-current="step"]')
    expect(current?.textContent).toBe('Chờ duyệt')
    expect(bar.textContent).toContain('Soạn thảo')
    expect(bar.textContent).toContain('Công bố')
  })

  it('disables Gửi duyệt with unsaved edits and submits the revision when clean', async () => {
    setState(makeState())
    render(<LegalTermsAdminTab />)
    const submit = await screen.findByRole('button', { name: 'Gửi duyệt' })
    expect(submit).not.toBeDisabled()

    fireEvent.change(screen.getByDisplayValue('Bản nháp'), {
      target: { value: 'Đã sửa' },
    })
    expect(submit).toBeDisabled()
    expect(submit).toHaveAttribute(
      'title',
      'Hãy lưu bản nháp trước khi gửi duyệt'
    )

    fireEvent.change(screen.getByDisplayValue('Đã sửa'), {
      target: { value: 'Bản nháp' },
    })
    expect(submit).not.toBeDisabled()
    fireEvent.click(submit)
    await waitFor(() => {
      expect(api.submitTermsForReview).toHaveBeenCalledWith(4)
    })
  })

  it('approves an in-review draft', async () => {
    setState(makeState({ reviewStatus: 'in_review' }))
    render(<LegalTermsAdminTab />)
    fireEvent.click(await screen.findByRole('button', { name: 'Duyệt' }))
    await waitFor(() => {
      expect(api.approveTerms).toHaveBeenCalledWith(4)
    })
  })

  it('shows the self-approval error message', async () => {
    setState(makeState({ reviewStatus: 'in_review' }))
    vi.mocked(api.approveTerms).mockRejectedValue(
      new ApiClientError('Forbidden', 403, {
        code: 'HTTP_403',
        message: 'Forbidden',
        details: { code: 'TERMS_SELF_APPROVAL_FORBIDDEN' },
      })
    )
    render(<LegalTermsAdminTab />)
    fireEvent.click(await screen.findByRole('button', { name: 'Duyệt' }))
    expect(
      await screen.findByText(
        'Người soạn bản nháp không thể tự duyệt. Hãy nhờ quản trị viên khác duyệt.'
      )
    ).toBeDefined()
  })

  it('requires a note to request changes', async () => {
    setState(makeState({ reviewStatus: 'in_review' }))
    render(<LegalTermsAdminTab />)
    fireEvent.click(await screen.findByRole('button', { name: 'Yêu cầu sửa' }))
    const send = screen.getByRole('button', { name: 'Gửi yêu cầu sửa' })
    expect(send).toBeDisabled()
    fireEvent.change(screen.getByLabelText(/Nội dung cần sửa/), {
      target: { value: 'Thiếu căn cứ' },
    })
    expect(send).not.toBeDisabled()
    fireEvent.click(send)
    await waitFor(() => {
      expect(api.requestTermsChanges).toHaveBeenCalledWith(4, 'Thiếu căn cứ')
    })
  })

  it('makes inputs read-only while in review and lets the editor withdraw', async () => {
    setState(makeState({ reviewStatus: 'in_review' }))
    render(<LegalTermsAdminTab />)
    const title = await screen.findByDisplayValue('Bản nháp')
    expect(title).toHaveAttribute('readonly')
    expect(
      screen.getByText(/Đang chờ duyệt — chỉnh sửa sẽ đưa bản nháp/)
    ).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: 'Quay lại soạn thảo' }))
    await waitFor(() => {
      expect(api.requestTermsChanges).toHaveBeenCalledWith(
        4,
        'Người soạn rút lại để chỉnh sửa'
      )
    })
  })

  it('shows the reviewer note after changes were requested', async () => {
    setState(makeState({ reviewNote: 'Bổ sung căn cứ điều 5' }))
    render(<LegalTermsAdminTab />)
    expect(
      await screen.findByText('Yêu cầu sửa: Bổ sung căn cứ điều 5')
    ).toBeDefined()
  })

  it('disables publish unless approved', async () => {
    setState(makeState())
    render(<LegalTermsAdminTab />)
    const publish = await screen.findByRole('button', {
      name: /Công bố phiên bản mới/,
    })
    expect(publish).toBeDisabled()
    expect(publish).toHaveAttribute('title', 'Cần được duyệt trước khi công bố')
  })

  it('publishes immediately without effectiveFrom by default', async () => {
    setState(makeState({ reviewStatus: 'approved' }))
    render(<LegalTermsAdminTab />)
    fireEvent.click(
      await screen.findByRole('button', { name: /Công bố phiên bản mới/ })
    )
    fireEvent.click(
      screen.getByRole('button', { name: /Xác nhận công bố ngay/ })
    )
    await waitFor(() => {
      expect(api.publishLegalTerms).toHaveBeenCalledWith({
        expectedRevision: 4,
      })
    })
  })

  it('sends effectiveFrom only for the scheduled option', async () => {
    setState(makeState({ reviewStatus: 'approved' }))
    render(<LegalTermsAdminTab />)
    fireEvent.click(
      await screen.findByRole('button', { name: /Công bố phiên bản mới/ })
    )
    fireEvent.click(screen.getByLabelText('Hẹn ngày giờ'))
    expect(
      screen.getByText(/chỉ thay thế phiên bản hiện hành vào đúng thời điểm/)
    ).toBeDefined()
    const dt = new Date(Date.now() + 2 * 24 * 3600 * 1000)
    const pad = (n: number): string => String(n).padStart(2, '0')
    const local = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T10:30`
    fireEvent.change(screen.getByLabelText('Ngày giờ có hiệu lực'), {
      target: { value: local },
    })
    fireEvent.click(
      screen.getByRole('button', { name: /Xác nhận hẹn công bố/ })
    )
    await waitFor(() => {
      expect(api.publishLegalTerms).toHaveBeenCalledWith({
        expectedRevision: 4,
        effectiveFrom: new Date(local).toISOString(),
      })
    })
  })

  it('shows effective date of the published version and the scheduled banner', async () => {
    setState(
      makeState(
        {},
        {
          scheduled: {
            ...published,
            version: 2,
            contentHash: 'b'.repeat(64),
            effectiveFrom: '2026-12-01T03:00:00.000Z',
          },
        }
      )
    )
    render(<LegalTermsAdminTab />)
    expect(await screen.findByText(/Có hiệu lực từ/)).toBeDefined()
    expect(screen.getByText(/Phiên bản v2 sẽ có hiệu lực từ/)).toBeDefined()
    expect(screen.getByText(/b{64}/)).toBeDefined()
  })
})
