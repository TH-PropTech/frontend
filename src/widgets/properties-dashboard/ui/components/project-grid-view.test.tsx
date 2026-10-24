import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ApiProjectItem } from '@/entities/properties'
import { ProjectGridView } from './project-grid-view'

const project: ApiProjectItem = {
  id: 'p1',
  name: 'Dự án A',
  description: 'Mô tả',
  location: 'Bình Thạnh',
  city: 'TP.HCM',
  district: 'Bình Thạnh',
  investor: 'CĐT A',
  amenities: [],
  images: [],
  createdAt: '',
  updatedAt: '',
}

function renderGrid(
  overrides: Partial<React.ComponentProps<typeof ProjectGridView>> = {}
) {
  const setActiveTab = vi.fn()
  const setSearchKeyword = vi.fn()
  render(
    <ProjectGridView
      apiProjects={[project]}
      isLoadingProjects={false}
      hasError={false}
      setActiveTab={setActiveTab}
      setSearchKeyword={setSearchKeyword}
      {...overrides}
    />
  )
  return { setActiveTab, setSearchKeyword }
}

describe('ProjectGridView', () => {
  it('renders backend projects and jumps to the apartments tab on select', () => {
    const { setActiveTab, setSearchKeyword } = renderGrid()
    fireEvent.click(screen.getByText('Dự án A'))
    expect(setSearchKeyword).toHaveBeenCalledWith('Dự án A')
    expect(setActiveTab).toHaveBeenCalledWith('single')
  })

  it('shows the loading state', () => {
    renderGrid({ isLoadingProjects: true })
    expect(screen.getByText('Đang tải dự án...')).toBeTruthy()
  })

  it('shows an error alert instead of fake projects when the API fails', () => {
    renderGrid({ apiProjects: [], hasError: true })
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('shows the empty state when there are no projects', () => {
    renderGrid({ apiProjects: [] })
    expect(
      screen.getByText('Không tìm thấy dự án phù hợp với bộ lọc hiện tại.')
    ).toBeTruthy()
  })
})
