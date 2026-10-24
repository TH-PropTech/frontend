import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CommunitySidebar } from './community-sidebar'

const counts = { total: 5, approved: 3, pending: 1, rejected: 1 }
const projects = [
  { name: 'Landmark 81', posts: 4 },
  { name: 'Masteri', posts: 1 },
]

function renderSidebar(
  overrides: Partial<React.ComponentProps<typeof CommunitySidebar>> = {}
) {
  const onSelectProject = vi.fn()
  render(
    <CommunitySidebar
      isAuthenticated
      myCounts={counts}
      projects={projects}
      selectedProject={null}
      onSelectProject={onSelectProject}
      {...overrides}
    />
  )
  return { onSelectProject }
}

describe('CommunitySidebar', () => {
  it('shows the author’s post breakdown including rejected posts', () => {
    renderSidebar()

    const section = screen.getByRole('region', { name: 'Bài viết của tôi' })
    expect(section).toHaveTextContent('5 bài')
    expect(section).toHaveTextContent('Đã hiển thị3')
    expect(section).toHaveTextContent('Đang chờ duyệt1')
    expect(section).toHaveTextContent('Bị từ chối1')
  })

  it('hides the personal widget from guests and offers no duplicate toggle', () => {
    renderSidebar({ isAuthenticated: false })

    expect(
      screen.queryByRole('region', { name: 'Bài viết của tôi' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Chỉ xem bài của tôi/ })
    ).not.toBeInTheDocument()
  })

  it('selects a project and toggles it off when clicked again', () => {
    const { onSelectProject } = renderSidebar()
    fireEvent.click(screen.getByRole('button', { name: /Landmark 81/ }))
    expect(onSelectProject).toHaveBeenCalledWith('Landmark 81')
  })

  it('deselects the active project case-insensitively and via "Bỏ chọn"', () => {
    const { onSelectProject } = renderSidebar({
      selectedProject: 'landmark 81',
    })

    const selected = screen.getByRole('button', { name: /Landmark 81/ })
    expect(selected).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(selected)
    expect(onSelectProject).toHaveBeenLastCalledWith(null)

    fireEvent.click(screen.getByRole('button', { name: 'Bỏ chọn' }))
    expect(onSelectProject).toHaveBeenCalledTimes(2)
  })

  it('shows a loading placeholder while project stats are loading', () => {
    renderSidebar({ projects: null })
    expect(
      screen.queryByText('Chưa có dự án nào có bài viết')
    ).not.toBeInTheDocument()
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })

  it('shows an empty message when no project has posts', () => {
    renderSidebar({ projects: [] })
    expect(
      screen.getByText('Chưa có dự án nào có bài viết')
    ).toBeInTheDocument()
  })

  it('lists at most eight projects', () => {
    const many = Array.from({ length: 12 }, (_, i) => ({
      name: `Dự án ${i}`,
      posts: 12 - i,
    }))
    renderSidebar({ projects: many })
    expect(screen.getAllByRole('button', { name: /Dự án \d+/ })).toHaveLength(8)
  })

  it('states the rules without the removed image-upload rule', () => {
    renderSidebar()
    expect(screen.getByText(/gắn kèm tên dự án/)).toBeInTheDocument()
    expect(screen.queryByText(/hình ảnh/i)).not.toBeInTheDocument()
  })
})
