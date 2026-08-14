import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ViewingNoteEditor } from './viewing-note-editor'

const mocks = vi.hoisted(() => ({
  getNotes: vi.fn(),
  createNote: vi.fn(),
  updateNote: vi.fn(),
  deleteNote: vi.fn(),
}))
vi.mock('../api/viewing-notes-api', () => ({
  getViewingNotes: mocks.getNotes,
  createViewingNote: mocks.createNote,
  updateViewingNote: mocks.updateNote,
  deleteViewingNote: mocks.deleteNote,
}))

function renderEditor(): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <ViewingNoteEditor apartmentId="apartment-1" />
    </QueryClientProvider>
  )
}

describe('ViewingNoteEditor', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows an empty state and creates a private checklist note', async () => {
    mocks.getNotes.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })
    mocks.createNote.mockResolvedValue({ _id: 'note-1', isPrivate: true })
    renderEditor()

    expect(await screen.findByText(/chưa có ghi chú xem nhà/i)).toBeTruthy()
    fireEvent.change(screen.getByLabelText(/mùi và thông gió/i), {
      target: { value: 'Không có mùi ẩm' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: /lưu ghi chú riêng tư/i })
    )

    await waitFor(() =>
      expect(mocks.createNote).toHaveBeenCalledWith({
        apartmentId: 'apartment-1',
        smell: 'Không có mùi ẩm',
      })
    )
  })

  it('shows a recoverable loading error', async () => {
    mocks.getNotes.mockRejectedValue(new Error('Notes unavailable'))
    renderEditor()
    expect(await screen.findByText(/không tải được ghi chú/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /thử lại/i })).toBeTruthy()
  })
})
