import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient, ApiClientError } from '@/shared/api/api-client'
import { CreatePostModal } from './create-post-modal'

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return { ...actual, apiClient: { get: vi.fn() } }
})

function renderModal(
  props: Partial<React.ComponentProps<typeof CreatePostModal>> = {}
) {
  const onClose = vi.fn()
  const onSubmit = vi.fn().mockResolvedValue(undefined)
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={queryClient}>
      <CreatePostModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        {...props}
      />
    </QueryClientProvider>
  )
  return { onClose, onSubmit }
}

const fill = (label: string, value: string): void => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

const submit = (): void => {
  fireEvent.click(screen.getByRole('button', { name: /Gửi bài viết/ }))
}

beforeEach(() => {
  vi.mocked(apiClient.get).mockReset()
  vi.mocked(apiClient.get).mockResolvedValue([
    { name: 'Landmark 81' },
    { name: 'Masteri' },
    {},
  ])
})

afterEach(() => {
  cleanup()
})

describe('CreatePostModal', () => {
  it('renders nothing while closed and does not load project suggestions', () => {
    renderModal({ isOpen: false })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(apiClient.get).not.toHaveBeenCalled()
  })

  it('is an accessible dialog with labelled fields and no image upload', () => {
    renderModal()

    expect(screen.getByRole('dialog')).toHaveAccessibleName(
      'Đăng bài thảo luận mới'
    )
    expect(screen.getByLabelText('Tiêu đề')).toBeInTheDocument()
    expect(screen.getByLabelText('Nội dung')).toBeInTheDocument()
    expect(screen.getByLabelText('Tên dự án / Chung cư')).toBeInTheDocument()
    expect(screen.queryByText(/Hình ảnh/)).not.toBeInTheDocument()
    expect(document.querySelector('input[type="file"]')).toBeNull()
  })

  it('suggests projects from the project list, skipping nameless entries', async () => {
    renderModal()

    await waitFor(() =>
      expect(document.querySelectorAll('datalist option')).toHaveLength(2)
    )
    expect(
      Array.from(document.querySelectorAll('datalist option')).map(
        option => (option as HTMLOptionElement).value
      )
    ).toEqual(['Landmark 81', 'Masteri'])
  })

  it('still works when project suggestions fail to load', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('down'))
    renderModal()

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled())
    expect(document.querySelectorAll('datalist option')).toHaveLength(0)
    expect(screen.getByLabelText('Tên dự án / Chung cư')).toBeEnabled()
  })

  it('requires a title and content', async () => {
    const { onSubmit } = renderModal()
    fill('Tên dự án / Chung cư', 'Landmark 81')
    fill('Tiêu đề', '   ')

    submit()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Vui lòng nhập đầy đủ tiêu đề và nội dung.'
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('requires a project tag', async () => {
    const { onSubmit } = renderModal()
    fill('Tiêu đề', 'Câu hỏi')
    fill('Nội dung', 'Chi tiết')

    submit()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Vui lòng gắn thẻ tên dự án/chung cư.'
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a trimmed payload with the chosen topic, then closes and resets', async () => {
    const { onSubmit, onClose } = renderModal()
    fill('Tiêu đề', '  Phí quản lý bao nhiêu?  ')
    fill('Nội dung', '  Cho mình hỏi...  ')
    fill('Tên dự án / Chung cư', '  Landmark 81 ')
    fireEvent.click(screen.getByRole('button', { name: 'Đánh giá' }))
    expect(screen.getByRole('button', { name: 'Đánh giá' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    submit()

    await waitFor(() => expect(onClose).toHaveBeenCalledOnce())
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Phí quản lý bao nhiêu?',
      content: 'Cho mình hỏi...',
      projectName: 'Landmark 81',
      topic: 'review',
    })
    expect(screen.getByLabelText('Tiêu đề')).toHaveValue('')
    expect(screen.getByLabelText('Nội dung')).toHaveValue('')
  })

  it('keeps the form and shows the server message when submitting fails', async () => {
    const onSubmit = vi
      .fn()
      .mockRejectedValue(new ApiClientError('Tiêu đề quá dài', 400, null))
    const { onClose } = renderModal({ onSubmit })
    fill('Tiêu đề', 'T')
    fill('Nội dung', 'C')
    fill('Tên dự án / Chung cư', 'P')

    submit()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Tiêu đề quá dài'
    )
    expect(screen.getByLabelText('Tiêu đề')).toHaveValue('T')
    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: /Gửi bài viết/ })).toBeEnabled()
  })

  it('shows a generic message for unexpected failures', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('network'))
    renderModal({ onSubmit })
    fill('Tiêu đề', 'T')
    fill('Nội dung', 'C')
    fill('Tên dự án / Chung cư', 'P')

    submit()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không thể đăng bài viết lúc này. Vui lòng thử lại sau.'
    )
  })

  it('blocks double submission while the request is in flight', async () => {
    let resolveSubmit: () => void = () => undefined
    const onSubmit = vi.fn(
      () => new Promise<void>(resolve => (resolveSubmit = resolve))
    )
    renderModal({ onSubmit })
    fill('Tiêu đề', 'T')
    fill('Nội dung', 'C')
    fill('Tên dự án / Chung cư', 'P')

    submit()
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Gửi bài viết/ })
      ).toBeDisabled()
    )
    fireEvent.submit(screen.getByLabelText('Tiêu đề').closest('form')!)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    resolveSubmit()
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Gửi bài viết/ })).toBeEnabled()
    )
  })

  it('closes from the cancel button', () => {
    const { onClose } = renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes on Escape', () => {
    const { onClose } = renderModal()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
