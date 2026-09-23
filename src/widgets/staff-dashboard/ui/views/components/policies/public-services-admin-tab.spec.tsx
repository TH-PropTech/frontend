import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicServicesAdminTab } from './public-services-admin-tab'

describe('PublicServicesAdminTab Component (5 Dimensions)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  // ═══ DIMENSION 1: HAPPY PATH ═══
  describe('Dimension 1: Happy Path & Core Rendering', () => {
    it('renders KPI summary counters and baseline regulations', () => {
      render(<PublicServicesAdminTab />)

      expect(screen.getByText('Quy định Đang Áp dụng')).toBeDefined()
      expect(screen.getByText('Tiêu chuẩn Bắt buộc')).toBeDefined()
      expect(screen.getByText('Căn cứ Pháp luật & DVC')).toBeDefined()
      expect(screen.getByText('Checklist Đối soát HĐ')).toBeDefined()

      expect(screen.getByTestId('regulation-card-REG-RES-01')).toBeDefined()
      expect(screen.getByTestId('regulation-card-REG-TAX-02')).toBeDefined()
      expect(screen.getByTestId('regulation-card-REG-FIRE-03')).toBeDefined()
    })

    it('filters regulations by category tab', () => {
      render(<PublicServicesAdminTab />)

      const taxCategoryBtn = screen.getByRole('button', {
        name: /Tài chính & Thuế/i,
      })
      fireEvent.click(taxCategoryBtn)

      expect(screen.getByTestId('regulation-card-REG-TAX-02')).toBeDefined()
      expect(screen.queryByTestId('regulation-card-REG-FIRE-03')).toBeNull()
    })

    it('searches regulations by keyword query', () => {
      render(<PublicServicesAdminTab />)

      const searchInput = screen.getByPlaceholderText(
        /Tìm kiếm mã, tên quy định hoặc căn cứ luật/i
      )
      fireEvent.change(searchInput, { target: { value: 'PCCC' } })

      expect(screen.getByTestId('regulation-card-REG-FIRE-03')).toBeDefined()
      expect(screen.queryByTestId('regulation-card-REG-TAX-02')).toBeNull()
    })
  })

  // ═══ DIMENSION 2: BOUNDARY & EDGE CASES ═══
  describe('Dimension 2: Boundary & Filtering Edge Cases', () => {
    it('displays empty state message when search returns 0 results', () => {
      render(<PublicServicesAdminTab />)

      const searchInput = screen.getByPlaceholderText(
        /Tìm kiếm mã, tên quy định hoặc căn cứ luật/i
      )
      fireEvent.change(searchInput, {
        target: { value: 'NON_EXISTENT_KEYWORD_XYZ' },
      })

      expect(
        screen.getByText(
          'Không tìm thấy quy định nào phù hợp với bộ lọc hiện tại.'
        )
      ).toBeDefined()
    })

    it('filters by compliance severity level', () => {
      render(<PublicServicesAdminTab />)

      const severitySelect = screen.getByDisplayValue('Tất cả mức độ tuân thủ')
      fireEvent.change(severitySelect, { target: { value: 'recommended' } })

      expect(screen.getByTestId('regulation-card-REG-MAINT-09')).toBeDefined()
      expect(screen.queryByTestId('regulation-card-REG-RES-01')).toBeNull()
    })
  })

  // ═══ DIMENSION 3: ADD & EDIT FORM (MUTATIONS) ═══
  describe('Dimension 3: Create & Edit Regulations', () => {
    it('opens add modal, creates a new regulation, and renders in list', async () => {
      render(<PublicServicesAdminTab />)

      const addBtn = screen.getByTestId('btn-add-regulation')
      fireEvent.click(addBtn)

      expect(screen.getByText('Thêm mới Quy định Nền tảng')).toBeDefined()

      const titleInput = screen.getByPlaceholderText(
        'VD: Tiêu chuẩn an toàn PCCC khi sạc xe điện'
      )
      fireEvent.change(titleInput, {
        target: { value: 'Quy định kiểm soát thú nuôi tầng cao' },
      })

      const summaryInput = screen.getByPlaceholderText(
        'Mô tả cụ thể quyền, nghĩa vụ và trách nhiệm thực hiện của các bên...'
      )
      fireEvent.change(summaryInput, {
        target: {
          value: 'Cư dân phải đăng ký và cam kết không thả rông thú cưng.',
        },
      })

      const saveBtn = screen.getByTestId('btn-save-regulation')
      fireEvent.click(saveBtn)

      await waitFor(() => {
        expect(
          screen.getByText('Quy định kiểm soát thú nuôi tầng cao')
        ).toBeDefined()
      })
    })

    it('opens edit modal for existing regulation and saves changes', async () => {
      render(<PublicServicesAdminTab />)

      const editBtn = screen.getByTestId('btn-edit-REG-RES-01')
      fireEvent.click(editBtn)

      expect(screen.getByText('Chỉnh sửa Quy định: REG-RES-01')).toBeDefined()

      const titleInput = screen.getByDisplayValue(
        'Bắt buộc đăng ký Tạm trú trực tuyến trong 30 ngày'
      )
      fireEvent.change(titleInput, {
        target: {
          value:
            'Bắt buộc đăng ký Tạm trú trực tuyến trong 30 ngày (Cập nhật 2026)',
        },
      })

      const saveBtn = screen.getByTestId('btn-save-regulation')
      fireEvent.click(saveBtn)

      await waitFor(() => {
        expect(
          screen.getByText(
            'Bắt buộc đăng ký Tạm trú trực tuyến trong 30 ngày (Cập nhật 2026)'
          )
        ).toBeDefined()
      })
    })
  })

  // ═══ DIMENSION 4: ACTIONS, PRIORITY REORDER & DUPLICATE ═══
  describe('Dimension 4: Actions, Toggle, Reorder & Duplicate', () => {
    it('toggles regulation status active/inactive', () => {
      render(<PublicServicesAdminTab />)

      const toggleBtn = screen.getByTestId('toggle-status-REG-RES-01')
      fireEvent.click(toggleBtn)

      expect(
        screen.getByText(/Tạm dừng áp dụng quy định \[REG-RES-01\]/i)
      ).toBeDefined()
    })

    it('duplicates regulation creating a copy', () => {
      render(<PublicServicesAdminTab />)

      const duplicateBtn = screen.getAllByTitle('Tạo bản sao quy định')[0]
      if (duplicateBtn) {
        fireEvent.click(duplicateBtn)
        expect(
          screen.getByTestId('regulation-card-REG-RES-01-COPY')
        ).toBeDefined()
      }
    })

    it('deletes regulation when confirmed', () => {
      render(<PublicServicesAdminTab />)

      const deleteBtn = screen.getByTestId('btn-delete-REG-RES-01')
      fireEvent.click(deleteBtn)

      expect(screen.queryByTestId('regulation-card-REG-RES-01')).toBeNull()
    })

    it('resets to baseline upon clicking reset button', () => {
      render(<PublicServicesAdminTab />)

      // First delete an item
      const deleteBtn = screen.getByTestId('btn-delete-REG-RES-01')
      fireEvent.click(deleteBtn)
      expect(screen.queryByTestId('regulation-card-REG-RES-01')).toBeNull()

      // Reset baseline
      const resetBtn = screen.getByTestId('btn-reset-baseline')
      fireEvent.click(resetBtn)

      expect(screen.getByTestId('regulation-card-REG-RES-01')).toBeDefined()
    })
  })

  // ═══ DIMENSION 5: MODAL & SIMULATOR INTEGRATION ═══
  describe('Dimension 5: Simulator & Legal Detail Modal Integration', () => {
    it('opens live user simulator modal', () => {
      render(<PublicServicesAdminTab />)

      const simulatorBtn = screen.getByTestId('btn-live-simulator')
      fireEvent.click(simulatorBtn)

      expect(
        screen.getByText(
          'Trình Giả Lập Giao Diện Người Dùng (Live User Preview)'
        )
      ).toBeDefined()

      const closeSimulatorBtn = screen.getByRole('button', {
        name: 'Đóng Trình Giả Lập',
      })
      fireEvent.click(closeSimulatorBtn)

      expect(
        screen.queryByText(
          'Trình Giả Lập Giao Diện Người Dùng (Live User Preview)'
        )
      ).toBeNull()
    })

    it('opens public service / statutory detail modal when clicking linked legal basis', () => {
      render(<PublicServicesAdminTab />)

      const legalBasisBtn = screen.getByRole('button', {
        name: /Căn cứ: TTHC 1.004194/i,
      })
      fireEvent.click(legalBasisBtn)

      expect(screen.getByRole('dialog')).toBeDefined()
      expect(
        screen.getByText(
          'Thủ tục hành chính cấp Xã/Phường theo quy định Bộ Công an'
        )
      ).toBeDefined()
    })
  })
})
