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
    editable,
    onLayoutChange,
  }: {
    config: { designs?: { id: string }[] }
    editable?: boolean
    onLayoutChange?: (designId: string, layout: unknown) => void
  }) => (
    <div data-testid="preview" data-editable={String(Boolean(editable))}>
      {config.designs?.length ?? 0} designs
      <button
        type="button"
        onClick={() =>
          onLayoutChange?.(config.designs?.[0]?.id ?? '', {
            items: { 'sofa-1': { x: 2, z: 3 } },
            extras: [{ id: 'extra-1', kind: 'chair', x: 1, z: 1, rot: 0 }],
          })
        }
      >
        emit-layout
      </button>
    </div>
  ),
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
  layout: { items: {}, extras: [] },
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

  it('keeps the viewer read-only until a design is being edited', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([design({})])
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    expect(await screen.findByTestId('preview')).toHaveAttribute(
      'data-editable',
      'false'
    )
    fireEvent.click(screen.getByRole('button', { name: 'Sửa thiết kế Bắc Âu' }))
    expect(screen.getByTestId('preview')).toHaveAttribute(
      'data-editable',
      'true'
    )
  })

  it('saves the dragged layout with the design and shows a summary', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([design({})])
    vi.mocked(updateAdminDesign).mockResolvedValue(design({}))
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: 'Sửa thiết kế Bắc Âu' })
    )
    expect(screen.getByTestId('layout-summary')).toHaveTextContent(
      'Đang dùng bố cục mẫu'
    )
    fireEvent.click(screen.getByRole('button', { name: 'emit-layout' }))
    expect(screen.getByTestId('layout-summary')).toHaveTextContent(
      '1 đồ đã chỉnh · 0 đang ẩn · 1 đồ thêm'
    )
    fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))

    await waitFor(() => expect(updateAdminDesign).toHaveBeenCalled())
    expect(vi.mocked(updateAdminDesign).mock.calls[0]?.[2]).toMatchObject({
      layout: {
        items: { 'sofa-1': { x: 2, z: 3 } },
        extras: [{ id: 'extra-1', kind: 'chair', x: 1, z: 1, rot: 0 }],
      },
    })
  })

  it('keeps the unsaved layout for a retry when saving fails', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([design({})])
    vi.mocked(updateAdminDesign).mockRejectedValueOnce(new Error('500'))
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: 'Sửa thiết kế Bắc Âu' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'emit-layout' }))
    fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))

    await waitFor(() => expect(updateAdminDesign).toHaveBeenCalledTimes(1))
    // vẫn ở form, bản nháp còn nguyên để thử lại
    expect(screen.getByTestId('layout-summary')).toHaveTextContent(
      '1 đồ đã chỉnh'
    )
    vi.mocked(updateAdminDesign).mockResolvedValueOnce(design({}))
    fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))
    await waitFor(() => expect(updateAdminDesign).toHaveBeenCalledTimes(2))
  })

  it('asks before discarding unsaved layout changes and can reset to the template', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([design({})])
    const confirm = vi.spyOn(window, 'confirm').mockReturnValueOnce(false)
    render(<ApartmentDesignsManager apartment={apartment} onClose={() => {}} />)

    fireEvent.click(
      await screen.findByRole('button', { name: 'Sửa thiết kế Bắc Âu' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'emit-layout' }))
    fireEvent.click(screen.getByRole('button', { name: 'Huỷ' }))
    expect(confirm).toHaveBeenCalled()
    expect(screen.getByTestId('layout-summary')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Đặt lại bố cục' }))
    expect(screen.getByTestId('layout-summary')).toHaveTextContent(
      'Đang dùng bố cục mẫu'
    )
    confirm.mockRestore()
  })

  it('renders the dialog straight under <body> so a transformed ancestor cannot offset it', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    const { container } = render(
      <div style={{ transform: 'translateX(0)' }}>
        <ApartmentDesignsManager apartment={apartment} onClose={() => {}} />
      </div>
    )

    const dialog = await screen.findByRole('dialog')

    expect(dialog.parentElement).toBe(document.body)
    expect(container.contains(dialog)).toBe(false)
  })
})
