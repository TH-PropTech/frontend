import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type {
  LegalDocItem,
  LegalFetchResult,
} from '../model/legal-knowledge.types'
import { LegalKnowledgeManager } from './legal-knowledge-manager'

const api = vi.hoisted(() => ({
  listLegalDocs: vi.fn(),
  getLegalDoc: vi.fn(),
  createLegalDoc: vi.fn(),
  updateLegalDoc: vi.fn(),
  publishLegalDoc: vi.fn(),
  unpublishLegalDoc: vi.fn(),
  archiveLegalDoc: vi.fn(),
  fetchLegalLink: vi.fn(),
  searchLegalKnowledge: vi.fn(),
}))

vi.mock('../api/legal-knowledge-api', () => api)
vi.mock('@/features/contracts', () => ({
  getAdminLegalSources: vi.fn().mockResolvedValue([]),
}))
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}))

const savedDoc: LegalDocItem = {
  _id: '64f0a1b2c3d4e5f6a7b8c9d0',
  title: 'Luật Nhà ở 2023',
  category: 'luat',
  docNumber: '27/2023/QH15',
  keywords: ['thuê nhà'],
  status: 'published',
  chunkCount: 12,
  contentLength: 9000,
  contentSource: 'link',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
}

const fetched: LegalFetchResult = {
  url: 'https://dichvucong.gov.vn/nha-o',
  finalUrl: 'https://dichvucong.gov.vn/nha-o',
  pageTitle: 'Trang nhà ở',
  rawCharCount: 4000,
  content: 'Điều 1. Hợp đồng thuê nhà phải lập thành văn bản.',
  distilled: true,
  suggestion: {
    title: 'Luật Nhà ở',
    category: 'luat',
    keywords: ['hợp đồng thuê'],
  },
}

describe('LegalKnowledgeManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    api.listLegalDocs.mockResolvedValue([savedDoc])
  })

  it('lists documents with their status and category', async () => {
    render(<LegalKnowledgeManager />)

    const row = (await screen.findByText('Luật Nhà ở 2023')).closest('li')
    if (!row) throw new Error('document row not rendered')
    expect(within(row).getByText('Đang áp dụng')).toBeInTheDocument()
    expect(within(row).getByText('Luật')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gỡ xuống' })).toBeInTheDocument()
  })

  it('fetches a link, fills the distilled text and saves it as published', async () => {
    const user = userEvent.setup()
    api.fetchLegalLink.mockResolvedValueOnce(fetched)
    api.createLegalDoc.mockResolvedValueOnce({ ...savedDoc, content: 'x' })
    render(<LegalKnowledgeManager />)
    await screen.findByText('Luật Nhà ở 2023')

    await user.click(screen.getByRole('button', { name: 'Thêm tài liệu' }))
    const urlInput = screen.getAllByPlaceholderText('https://...')[0]
    if (!urlInput) throw new Error('URL input not rendered')
    await user.type(urlInput, fetched.url)
    await user.click(screen.getByRole('button', { name: 'Đọc & chắt lọc' }))

    expect(api.fetchLegalLink).toHaveBeenCalledWith(fetched.url)
    const contentBox = await screen.findByDisplayValue(
      /Hợp đồng thuê nhà phải lập thành văn bản/
    )
    expect(contentBox).toBeInTheDocument()
    expect(screen.getByLabelText(/Tên văn bản/)).toHaveValue('Luật Nhà ở')

    await user.click(screen.getByRole('button', { name: 'Lưu & xuất bản' }))

    await waitFor(() => {
      expect(api.createLegalDoc).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Luật Nhà ở',
          category: 'luat',
          sourceUrl: fetched.finalUrl,
          keywords: ['hợp đồng thuê'],
          contentSource: 'link',
          status: 'published',
        })
      )
    })
    expect(api.listLegalDocs).toHaveBeenCalledTimes(2)
  })

  it('shows a warning and blocks saving when the content is too short', async () => {
    const user = userEvent.setup()
    render(<LegalKnowledgeManager />)
    await screen.findByText('Luật Nhà ở 2023')

    await user.click(screen.getByRole('button', { name: 'Thêm tài liệu' }))
    await user.click(screen.getByRole('button', { name: 'Lưu nháp' }))

    expect(
      await screen.findByText('Tên văn bản cần từ 3 đến 300 ký tự.')
    ).toBeInTheDocument()
    expect(api.createLegalDoc).not.toHaveBeenCalled()
  })
})
