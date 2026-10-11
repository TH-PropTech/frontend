import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import * as legalApi from '@/features/contracts/api/legal-sources-api'
import type {
  PlatformRegulation,
  PlatformRegulationInput,
} from '@/features/contracts/model/legal-governance-data'
import {
  PANEL_SOURCES,
  REGULATIONS,
} from '@/features/contracts/test-fixtures/legal-sources.fixture'
import { PublicServicesAdminTab } from './public-services-admin-tab'

vi.mock('@/features/contracts/api/legal-sources-api', async () => {
  const actual = await vi.importActual<typeof legalApi>(
    '@/features/contracts/api/legal-sources-api'
  )
  return {
    ...actual,
    getAdminPlatformRegulations: vi.fn(),
    getAdminLegalSources: vi.fn(),
    createPlatformRegulation: vi.fn(),
    updatePlatformRegulation: vi.fn(),
    deletePlatformRegulation: vi.fn(),
    reorderPlatformRegulations: vi.fn(),
  }
})

/** Backend giả lập trong bộ nhớ để kiểm tra dữ liệu thực sự đi qua API */
function installFakeBackend(): { store: PlatformRegulation[] } {
  const db = { store: REGULATIONS.map(r => ({ ...r })) }
  vi.mocked(legalApi.getAdminPlatformRegulations).mockImplementation(() =>
    Promise.resolve(db.store.map(r => ({ ...r })))
  )
  vi.mocked(legalApi.getAdminLegalSources).mockResolvedValue(PANEL_SOURCES)
  vi.mocked(legalApi.createPlatformRegulation).mockImplementation(
    (input: PlatformRegulationInput) => {
      const created: PlatformRegulation = {
        ...input,
        id: `reg-${db.store.length + 1}`,
        order: db.store.length + 1,
        isActive: input.isActive ?? true,
        isDefault: false,
      }
      db.store = [...db.store, created]
      return Promise.resolve(created)
    }
  )
  vi.mocked(legalApi.updatePlatformRegulation).mockImplementation(
    (id, patch) => {
      db.store = db.store.map(r =>
        r.id === id ? ({ ...r, ...patch } as PlatformRegulation) : r
      )
      return Promise.resolve(db.store.find(r => r.id === id)!)
    }
  )
  vi.mocked(legalApi.deletePlatformRegulation).mockImplementation(id => {
    db.store = db.store.filter(r => r.id !== id)
    return Promise.resolve()
  })
  vi.mocked(legalApi.reorderPlatformRegulations).mockImplementation(ids => {
    db.store = ids.map((id, i) => ({
      ...db.store.find(r => r.id === id)!,
      order: i + 1,
    }))
    return Promise.resolve(db.store)
  })
  return db
}

async function renderLoaded(): Promise<void> {
  render(<PublicServicesAdminTab />)
  await screen.findByTestId('regulation-card-REG-RES-01')
}

describe('PublicServicesAdminTab (API-backed)', () => {
  let db: { store: PlatformRegulation[] }

  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    db = installFakeBackend()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  describe('loading', () => {
    it('renders regulations and KPI tiles from the API', async () => {
      await renderLoaded()

      expect(screen.getByText('Quy định Đang Áp dụng')).toBeInTheDocument()
      expect(
        screen.getByTestId('regulation-card-REG-TAX-02')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('regulation-card-REG-FIRE-03')
      ).toBeInTheDocument()
    })

    it('never uses localStorage as the regulation store', async () => {
      await renderLoaded()
      expect(localStorage.length).toBe(0)
    })

    it('shows load error with retry', async () => {
      vi.mocked(legalApi.getAdminPlatformRegulations).mockRejectedValueOnce(
        new Error('Mất kết nối')
      )

      render(<PublicServicesAdminTab />)

      const error = await screen.findByTestId('public-services-admin-error')
      expect(error).toHaveTextContent('Mất kết nối')
      fireEvent.click(within(error).getByRole('button', { name: 'Thử lại' }))

      expect(
        await screen.findByTestId('regulation-card-REG-RES-01')
      ).toBeInTheDocument()
    })

    it('no longer offers the localStorage baseline reset', async () => {
      await renderLoaded()
      expect(screen.queryByTestId('btn-reset-baseline')).toBeNull()
    })
  })

  describe('filters', () => {
    it('filters by category, search and severity', async () => {
      await renderLoaded()

      fireEvent.click(screen.getByRole('button', { name: /Tài chính & Thuế/i }))
      expect(
        screen.getByTestId('regulation-card-REG-TAX-02')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('regulation-card-REG-FIRE-03')).toBeNull()

      fireEvent.click(screen.getByRole('button', { name: /Tất cả danh mục/i }))
      fireEvent.change(
        screen.getByPlaceholderText(/Tìm kiếm mã, tên quy định/i),
        { target: { value: 'NON_EXISTENT_KEYWORD_XYZ' } }
      )
      expect(
        screen.getByText(
          'Không tìm thấy quy định nào phù hợp với bộ lọc hiện tại.'
        )
      ).toBeInTheDocument()
    })

    it('searches by linked source title', async () => {
      await renderLoaded()

      fireEvent.change(
        screen.getByPlaceholderText(/Tìm kiếm mã, tên quy định/i),
        { target: { value: 'khai thuế đối với cá nhân' } }
      )

      expect(
        screen.getByTestId('regulation-card-REG-TAX-02')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('regulation-card-REG-RES-01')).toBeNull()
    })
  })

  describe('mutations', () => {
    it('creates a regulation through the API with a linked source', async () => {
      await renderLoaded()

      fireEvent.click(screen.getByTestId('btn-add-regulation'))
      fireEvent.change(
        screen.getByPlaceholderText(
          'VD: Tiêu chuẩn an toàn PCCC khi sạc xe điện'
        ),
        { target: { value: 'Quy định kiểm soát thú nuôi tầng cao' } }
      )
      fireEvent.change(
        screen.getByPlaceholderText(
          'Mô tả cụ thể quyền, nghĩa vụ và trách nhiệm thực hiện của các bên...'
        ),
        { target: { value: 'Cư dân phải đăng ký thú cưng.' } }
      )
      await userEvent.click(screen.getByTestId('select-linked-source'))
      fireEvent.click(
        await screen.findByRole('option', { name: /Luật Nhà ở 2023/ })
      )
      fireEvent.click(screen.getByTestId('btn-save-regulation'))

      expect(
        await screen.findByText('Quy định kiểm soát thú nuôi tầng cao')
      ).toBeInTheDocument()
      expect(legalApi.createPlatformRegulation).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Quy định kiểm soát thú nuôi tầng cao',
          linkedSourceKey: 'housing-law-2023',
        })
      )
      expect(db.store).toHaveLength(4)
    })

    it('keeps the form open with the API error when saving fails', async () => {
      vi.mocked(legalApi.updatePlatformRegulation).mockRejectedValueOnce(
        new ApiClientError('conflict', 409, {
          code: 'HTTP_409',
          message: 'Mã quy định "REG-TAX-02" đã tồn tại',
        })
      )
      await renderLoaded()

      fireEvent.click(screen.getByTestId('btn-edit-REG-RES-01'))
      fireEvent.change(screen.getByDisplayValue('REG-RES-01'), {
        target: { value: 'REG-TAX-02' },
      })
      fireEvent.click(screen.getByTestId('btn-save-regulation'))

      expect(
        await screen.findByText('Mã quy định "REG-TAX-02" đã tồn tại')
      ).toBeInTheDocument()
      expect(screen.getByDisplayValue('REG-TAX-02')).toBeInTheDocument()
    })

    it('edits a regulation', async () => {
      await renderLoaded()

      fireEvent.click(screen.getByTestId('btn-edit-REG-RES-01'))
      fireEvent.change(
        screen.getByDisplayValue(
          'Bắt buộc đăng ký Tạm trú trực tuyến trong 30 ngày'
        ),
        { target: { value: 'Tạm trú (Cập nhật 2026)' } }
      )
      fireEvent.click(screen.getByTestId('btn-save-regulation'))

      expect(
        await screen.findByText('Tạm trú (Cập nhật 2026)')
      ).toBeInTheDocument()
      expect(db.store[0]?.title).toBe('Tạm trú (Cập nhật 2026)')
    })

    it('toggles, duplicates and deletes through the API', async () => {
      await renderLoaded()

      fireEvent.click(screen.getByTestId('toggle-status-REG-RES-01'))
      expect(
        await screen.findByText(/Tạm dừng áp dụng quy định \[REG-RES-01\]/i)
      ).toBeInTheDocument()
      expect(db.store[0]?.isActive).toBe(false)

      fireEvent.click(screen.getAllByTitle('Tạo bản sao quy định')[0]!)
      expect(
        await screen.findByTestId('regulation-card-REG-RES-01-COPY')
      ).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('btn-delete-REG-RES-01'))
      await waitFor(() =>
        expect(screen.queryByTestId('regulation-card-REG-RES-01')).toBeNull()
      )
      expect(db.store.some(r => r.code === 'REG-RES-01')).toBe(false)
    })

    it('persists reorder and rolls back on failure', async () => {
      await renderLoaded()

      fireEvent.click(screen.getAllByLabelText('Hạ xuống dưới')[0]!)
      await waitFor(() =>
        expect(db.store.map(r => r.code)).toEqual([
          'REG-TAX-02',
          'REG-RES-01',
          'REG-FIRE-03',
        ])
      )

      vi.mocked(legalApi.reorderPlatformRegulations).mockRejectedValueOnce(
        new Error('Lỗi sắp xếp')
      )
      fireEvent.click(screen.getAllByLabelText('Hạ xuống dưới')[0]!)
      expect(await screen.findByText('Lỗi sắp xếp')).toBeInTheDocument()
      const cards = screen.getAllByTestId(/^regulation-card-/)
      expect(cards[0]).toHaveAttribute(
        'data-testid',
        'regulation-card-REG-TAX-02'
      )
    })
  })

  describe('simulator & legal detail', () => {
    it('opens the live simulator with API data', async () => {
      await renderLoaded()

      fireEvent.click(screen.getByTestId('btn-live-simulator'))
      expect(
        screen.getByText(
          'Trình Giả Lập Giao Diện Người Dùng (Live User Preview)'
        )
      ).toBeInTheDocument()
      fireEvent.click(
        screen.getByRole('button', { name: 'Đóng Trình Giả Lập' })
      )
    })

    it('opens the linked source detail from API data', async () => {
      await renderLoaded()

      fireEvent.click(
        screen.getByRole('button', { name: /Căn cứ: TTHC 1.004194/i })
      )

      const dialog = screen.getByRole('dialog')
      expect(
        within(dialog).getByText(PANEL_SOURCES[0]!.subtitle)
      ).toBeInTheDocument()
    })
  })
})
