import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { CommunityFilters } from '../../lib/community-types'
import { CommunityToolbar } from './community-toolbar'

const idle: CommunityFilters = { topic: 'all', search: '', project: null }

function renderToolbar(
  filters: CommunityFilters = idle,
  showCreateButton = true
) {
  const handlers = {
    onTopicChange: vi.fn(),
    onSearchChange: vi.fn(),
    onProjectClear: vi.fn(),
    onReset: vi.fn(),
    onCreateClick: vi.fn(),
  }
  render(
    <CommunityToolbar
      filters={filters}
      showCreateButton={showCreateButton}
      {...handlers}
    />
  )
  return handlers
}

describe('CommunityToolbar', () => {
  it('marks the active topic tab and changes topic on click', () => {
    const { onTopicChange } = renderToolbar({ ...idle, topic: 'qa' })

    expect(screen.getByRole('tab', { name: 'Hỏi đáp' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('tab', { name: 'Tất cả' })).toHaveAttribute(
      'aria-selected',
      'false'
    )

    fireEvent.click(screen.getByRole('tab', { name: 'Đánh giá' }))
    expect(onTopicChange).toHaveBeenCalledWith('review')
  })

  it('reports search typing and clears it with the labelled button', () => {
    const { onSearchChange } = renderToolbar({ ...idle, search: 'phí' })

    fireEvent.change(screen.getByRole('searchbox', { name: 'Tìm bài viết' }), {
      target: { value: 'phí quản lý' },
    })
    expect(onSearchChange).toHaveBeenCalledWith('phí quản lý')

    fireEvent.click(
      screen.getByRole('button', { name: 'Xóa từ khóa tìm kiếm' })
    )
    expect(onSearchChange).toHaveBeenLastCalledWith('')
  })

  it('shows the create button and reports clicks', () => {
    const { onCreateClick } = renderToolbar()
    fireEvent.click(screen.getByRole('button', { name: 'Đăng bài mới' }))
    expect(onCreateClick).toHaveBeenCalledOnce()
  })

  it('hides the create button when posting is not permitted', () => {
    renderToolbar(idle, false)
    expect(
      screen.queryByRole('button', { name: 'Đăng bài mới' })
    ).not.toBeInTheDocument()
  })

  it('shows no filter chips and no clear button while idle', () => {
    renderToolbar()
    expect(screen.queryByText('Đang lọc:')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Xóa từ khóa tìm kiếm' })
    ).not.toBeInTheDocument()
  })

  it('lists active filters and lets each be removed or all be reset', () => {
    const handlers = renderToolbar({
      topic: 'all',
      search: 'gió',
      project: 'Landmark 81',
    })

    expect(screen.getByText(/Dự án: Landmark 81/)).toBeInTheDocument()
    expect(screen.getByText(/Từ khóa: "gió"/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Bỏ lọc dự án' }))
    expect(handlers.onProjectClear).toHaveBeenCalledOnce()

    fireEvent.click(screen.getByRole('button', { name: 'Xóa từ khóa' }))
    expect(handlers.onSearchChange).toHaveBeenCalledWith('')

    fireEvent.click(screen.getByRole('button', { name: 'Đặt lại bộ lọc' }))
    expect(handlers.onReset).toHaveBeenCalledOnce()
  })
})
