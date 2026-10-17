import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createAdminDesign,
  deleteAdminDesign,
  listAdminDesigns,
  updateAdminDesign,
} from '../api/floorplan-designs-api'
import type { AdminFloorplanDesign } from '../model/floorplan-design'
import { ApartmentDesignsManager } from './apartment-designs-manager'

vi.mock('../api/floorplan-designs-api', () => ({
  listAdminDesigns: vi.fn(),
  createAdminDesign: vi.fn(),
  updateAdminDesign: vi.fn(),
  deleteAdminDesign: vi.fn(),
}))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
// iframe của viewer không cần chạy trong test
vi.mock('./apartment-floorplan-frame', () => ({
  ApartmentFloorplanFrame: ({
    config,
  }: {
    config: { designs?: unknown[] }
  }) => <div data-testid="preview">{config.designs?.length ?? 0} designs</div>,
}))

const apartment = {
  id: 'apt-1',
  title: 'Căn A',
  bedrooms: 2,
  bathrooms: 1,
  area: 70,
  furniture: 'Đầy đủ nội thất',
}

const design = (over: Partial<AdminFloorplanDesign>): AdminFloorplanDesign => ({
  id: 'd1',
  name: 'Bắc Âu',
  description: '',
  theme: 'nordic',
  palette: {},
  furnishing: null,
  defaultHour: 10,
  visible: true,
  order: 0,
  updatedAt: '2026-10-01T00:00:00.000Z',
  ...over,
})

describe('ApartmentDesignsManager', () => {
  beforeEach(() => {
    vi.mocked(listAdminDesigns).mockReset()
    vi.mocked(createAdminDesign).mockReset()
    vi.mocked(updateAdminDesign).mockReset()
    vi.mocked(deleteAdminDesign).mockReset()
  })

  it('explains the default style when the apartment has no designs', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    expect(await screen.findByText(/chưa có thiết kế nào/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Thêm thiết kế/ })).toBeVisible()
  })

  it('hides a visible design with a single toggle', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([design({})])
    vi.mocked(updateAdminDesign).mockResolvedValue(design({ visible: false }))
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: 'Ẩn thiết kế Bắc Âu' })
    )

    await waitFor(() =>
      expect(updateAdminDesign).toHaveBeenCalledWith('apt-1', 'd1', {
        visible: false,
      })
    )
    expect(
      await screen.findByRole('button', { name: 'Hiện thiết kế Bắc Âu' })
    ).toBeInTheDocument()
  })

  it('creates a design from the form and lists it', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    vi.mocked(createAdminDesign).mockResolvedValue(
      design({ id: 'new', name: 'Ấm cúng mới', theme: 'warm' })
    )
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: /Thêm thiết kế/ })
    )
    fireEvent.change(screen.getByLabelText('Tên thiết kế'), {
      target: { value: 'Ấm cúng mới' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Ấm cúng/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Thêm thiết kế' }))

    await waitFor(() => expect(createAdminDesign).toHaveBeenCalled())
    expect(vi.mocked(createAdminDesign).mock.calls[0]?.[1]).toMatchObject({
      name: 'Ấm cúng mới',
      theme: 'warm',
      furnishing: null,
      visible: true,
    })
    expect(await screen.findByText('Ấm cúng mới')).toBeInTheDocument()
  })

  it('does not allow saving a design without a name', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: /Thêm thiết kế/ })
    )

    expect(screen.getByRole('button', { name: 'Thêm thiết kế' })).toBeDisabled()
  })

  it('previews the draft while editing and every saved design otherwise', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([
      design({}),
      design({ id: 'd2', name: 'Sang', theme: 'luxury', visible: false }),
    ])
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    expect(await screen.findByTestId('preview')).toHaveTextContent('2 designs')
    fireEvent.click(screen.getByRole('button', { name: 'Sửa thiết kế Bắc Âu' }))
    expect(screen.getByTestId('preview')).toHaveTextContent('1 designs')
  })
})
