'use client'

import * as React from 'react'
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Building2,
  CheckCircle2,
  Copy,
  Cpu,
  Edit3,
  Eye,
  FileCheck,
  FileText,
  Flame,
  GripVertical,
  Plus,
  Receipt,
  RotateCcw,
  Scale,
  Search,
  ShieldCheck,
  Sliders,
  Trash2,
  X,
} from 'lucide-react'
import {
  OFFICIAL_PROCEDURES_DATA,
  getStoredRegulations,
  resetRegulationsToBaseline,
  saveStoredRegulations,
  type PlatformRegulation,
  type PropertyScope,
  type PublicServiceProcedureKey,
  type RegulationCategory,
  type RegulationChecklistItem,
  type RegulationSeverity,
} from '@/features/contracts/model/legal-governance-data'
import { PublicServiceDetailModal } from '@/features/contracts/ui/public-service-detail-modal'

const CATEGORY_LABELS: Record<
  RegulationCategory,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  residence: { label: 'Cư trú & An ninh', icon: Building2 },
  'tax-finance': { label: 'Tài chính & Thuế', icon: Receipt },
  'fire-safety': { label: 'An toàn & PCCC', icon: Flame },
  'building-operations': { label: 'Nội quy Tòa nhà', icon: Building2 },
  'digital-legal': { label: 'Pháp lý số & e-Consent', icon: Cpu },
  'deposit-handover': { label: 'Cọc & Bàn giao', icon: FileCheck },
}

const SEVERITY_LABELS: Record<
  RegulationSeverity,
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  mandatory: {
    label: 'Bắt buộc tuân thủ',
    bgClass: 'bg-[var(--danger)]/10',
    textClass: 'text-[var(--danger)]',
    borderClass: 'border-[var(--danger)]/30',
  },
  recommended: {
    label: 'Khuyến nghị tiêu chuẩn',
    bgClass: 'bg-[var(--primary)]/10',
    textClass: 'text-[var(--primary)]',
    borderClass: 'border-[var(--primary)]/30',
  },
  optional: {
    label: 'Thỏa thuận tự chọn',
    bgClass: 'bg-[var(--muted)]/10',
    textClass: 'text-[var(--muted)]',
    borderClass: 'border-[var(--border)]',
  },
}

const SCOPE_LABELS: Record<PropertyScope, string> = {
  all: 'Tất cả loại hình',
  apartment: 'Căn hộ chung cư',
  'serviced-apartment': 'Căn hộ dịch vụ',
  'villa-house': 'Nhà phố / Biệt thự',
  room: 'Phòng trọ sinh viên',
}

export function PublicServicesAdminTab(): React.ReactElement {
  const [regulations, setRegulations] = React.useState<PlatformRegulation[]>(
    () => getStoredRegulations()
  )
  const [selectedCategory, setSelectedCategory] = React.useState<
    'all' | RegulationCategory
  >('all')
  const [selectedSeverity, setSelectedSeverity] = React.useState<
    'all' | RegulationSeverity
  >('all')
  const [selectedStatus, setSelectedStatus] = React.useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'info' | 'error'
    text: string
  } | null>(null)

  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  // Modals & Drawers
  const [editingRegulation, setEditingRegulation] =
    React.useState<PlatformRegulation | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [detailModalKey, setDetailModalKey] =
    React.useState<PublicServiceProcedureKey | null>(null)
  const [isSimulatorOpen, setIsSimulatorOpen] = React.useState(false)

  // Form State for Add / Edit
  const [formCode, setFormCode] = React.useState('')
  const [formTitle, setFormTitle] = React.useState('')
  const [formSummary, setFormSummary] = React.useState('')
  const [formCategory, setFormCategory] =
    React.useState<RegulationCategory>('residence')
  const [formSeverity, setFormSeverity] =
    React.useState<RegulationSeverity>('mandatory')
  const [formScope, setFormScope] = React.useState<PropertyScope[]>([
    'apartment',
  ])
  const [formLinkedLegalKey, setFormLinkedLegalKey] = React.useState<
    PublicServiceProcedureKey | ''
  >('1.004194')
  const [formChecklist, setFormChecklist] = React.useState<
    Array<{ id: string; label: string; hint?: string | undefined }>
  >([{ id: 'chk-1', label: '', hint: '' }])
  const [formError, setFormError] = React.useState<string | null>(null)

  const showNotification = (
    text: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const updateAndSave = (newList: PlatformRegulation[]) => {
    setRegulations(newList)
    saveStoredRegulations(newList)
  }

  // Drag and Drop Handlers
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const updated = [...regulations]
    const [movedItem] = updated.splice(draggedIndex, 1)
    if (movedItem) {
      updated.splice(targetIndex, 0, movedItem)
      updateAndSave(updated)
      showNotification(
        `Đã chuyển quy định "${movedItem.code}" sang vị trí #${targetIndex + 1}`
      )
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // Move buttons for accessibility
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...regulations]
    const current = updated[index]
    const prev = updated[index - 1]
    if (current && prev) {
      updated[index - 1] = current
      updated[index] = prev
      updateAndSave(updated)
      showNotification(
        `Đã đẩy quy định "${current.code}" lên thứ tự ưu tiên cao hơn`
      )
    }
  }

  const handleMoveDown = (index: number) => {
    if (index >= regulations.length - 1) return
    const updated = [...regulations]
    const current = updated[index]
    const next = updated[index + 1]
    if (current && next) {
      updated[index + 1] = current
      updated[index] = next
      updateAndSave(updated)
      showNotification(`Đã hạ quy định "${current.code}" xuống thứ tự phía sau`)
    }
  }

  const handleToggleStatus = (id: string) => {
    const updated = regulations.map(reg => {
      if (reg.id === id) {
        const nextState = !reg.isActive
        showNotification(
          `${nextState ? 'Kích hoạt' : 'Tạm dừng'} áp dụng quy định [${reg.code}]`
        )
        return { ...reg, isActive: nextState }
      }
      return reg
    })
    updateAndSave(updated)
  }

  const handleDelete = (id: string, code: string) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa quy định [${code}] khỏi danh mục nền tảng?`
      )
    ) {
      const updated = regulations.filter(reg => reg.id !== id)
      updateAndSave(updated)
      showNotification(`Đã xóa quy định [${code}] thành công`, 'info')
    }
  }

  const handleDuplicate = (reg: PlatformRegulation) => {
    const newCode = `${reg.code}-COPY`
    const duplicated: PlatformRegulation = {
      ...reg,
      id: `reg-${Date.now()}`,
      code: newCode,
      title: `${reg.title} (Bản sao)`,
      order: regulations.length + 1,
      isDefault: false,
      updatedAt: new Date().toISOString(),
    }
    const updated = [...regulations, duplicated]
    updateAndSave(updated)
    showNotification(`Đã nhân bản quy định mới [${newCode}]`)
  }

  const handleResetBaseline = () => {
    if (
      window.confirm(
        'Khôi phục danh mục về 10 Quy định Chuẩn Baseline ban đầu? Các tùy chỉnh hiện tại sẽ được đặt lại theo chuẩn quốc gia.'
      )
    ) {
      const baseline = resetRegulationsToBaseline()
      setRegulations(baseline)
      showNotification('Đã khôi phục thành công 10 quy định chuẩn Baseline!')
    }
  }

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingRegulation(null)
    setFormCode(`REG-CUST-${Math.floor(10 + Math.random() * 90)}`)
    setFormTitle('')
    setFormSummary('')
    setFormCategory('residence')
    setFormSeverity('mandatory')
    setFormScope(['apartment'])
    setFormLinkedLegalKey('1.004194')
    setFormChecklist([{ id: `chk-${Date.now()}-1`, label: '', hint: '' }])
    setFormError(null)
    setIsAddModalOpen(true)
  }

  // Open Modal for Edit
  const handleOpenEditModal = (reg: PlatformRegulation) => {
    setEditingRegulation(reg)
    setFormCode(reg.code)
    setFormTitle(reg.title)
    setFormSummary(reg.summary)
    setFormCategory(reg.category)
    setFormSeverity(reg.severity)
    setFormScope(reg.scope)
    setFormLinkedLegalKey(reg.linkedLegalKey ?? '')
    setFormChecklist(
      reg.checklistItems.length > 0
        ? reg.checklistItems.map(c => ({ ...c }))
        : [{ id: `chk-${Date.now()}-1`, label: '', hint: '' }]
    )
    setFormError(null)
    setIsAddModalOpen(true)
  }

  // Save Modal Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCode.trim() || !formTitle.trim() || !formSummary.trim()) {
      setFormError(
        'Vui lòng nhập đầy đủ Mã quy định, Tiêu đề và Nội dung tóm tắt.'
      )
      return
    }

    const validChecklist: RegulationChecklistItem[] = formChecklist
      .filter(item => item.label.trim().length > 0)
      .map((item, idx) => ({
        id: item.id || `chk-${Date.now()}-${idx}`,
        label: item.label.trim(),
        hint: item.hint?.trim() || undefined,
      }))

    if (editingRegulation) {
      // Edit existing
      const updated = regulations.map(reg => {
        if (reg.id === editingRegulation.id) {
          return {
            ...reg,
            code: formCode.trim().toUpperCase(),
            title: formTitle.trim(),
            summary: formSummary.trim(),
            category: formCategory,
            severity: formSeverity,
            scope:
              formScope.length > 0 ? formScope : (['all'] as PropertyScope[]),
            linkedLegalKey:
              formLinkedLegalKey !== '' ? formLinkedLegalKey : undefined,
            checklistItems: validChecklist,
            updatedAt: new Date().toISOString(),
          }
        }
        return reg
      })
      updateAndSave(updated)
      showNotification(`Đã cập nhật quy định [${formCode}] thành công!`)
    } else {
      // Create new
      const newReg: PlatformRegulation = {
        id: `reg-${Date.now()}`,
        code: formCode.trim().toUpperCase(),
        title: formTitle.trim(),
        summary: formSummary.trim(),
        category: formCategory,
        severity: formSeverity,
        scope: formScope.length > 0 ? formScope : (['all'] as PropertyScope[]),
        linkedLegalKey:
          formLinkedLegalKey !== '' ? formLinkedLegalKey : undefined,
        checklistItems: validChecklist,
        order: regulations.length + 1,
        isActive: true,
        isDefault: false,
        updatedAt: new Date().toISOString(),
      }
      const updated = [...regulations, newReg]
      updateAndSave(updated)
      showNotification(`Đã thêm mới quy định [${newReg.code}] vào hệ thống!`)
    }

    setIsAddModalOpen(false)
  }

  // Filtered Regulations
  const filteredRegulations = regulations.filter(reg => {
    if (selectedCategory !== 'all' && reg.category !== selectedCategory) {
      return false
    }
    if (selectedSeverity !== 'all' && reg.severity !== selectedSeverity) {
      return false
    }
    if (selectedStatus === 'active' && !reg.isActive) return false
    if (selectedStatus === 'inactive' && reg.isActive) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchCode = reg.code.toLowerCase().includes(q)
      const matchTitle = reg.title.toLowerCase().includes(q)
      const matchSummary = reg.summary.toLowerCase().includes(q)
      const matchLegal =
        reg.linkedLegalKey &&
        OFFICIAL_PROCEDURES_DATA[reg.linkedLegalKey]?.title
          .toLowerCase()
          .includes(q)
      return matchCode || matchTitle || matchSummary || matchLegal
    }
    return true
  })

  // KPI Metrics
  const activeCount = regulations.filter(r => r.isActive).length
  const mandatoryCount = regulations.filter(
    r => r.isActive && r.severity === 'mandatory'
  ).length
  const totalChecklistItems = regulations.reduce(
    (sum, r) => (r.isActive ? sum + r.checklistItems.length : sum),
    0
  )
  const connectedLegalCount = new Set(
    regulations.map(r => r.linkedLegalKey).filter(Boolean)
  ).size

  return (
    <div
      data-testid="public-services-admin-tab"
      className="space-y-6 animate-in fade-in duration-200"
    >
      {/* ═══ NOTIFICATION TOAST ═══ */}
      {notification && (
        <div
          data-testid="governance-toast"
          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold shadow-md transition-all ${
            notification.type === 'success'
              ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30'
              : notification.type === 'error'
                ? 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/30'
                : 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 hover:opacity-75"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ═══ HEADER SUMMARY & KPI TILES ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Quy định Đang Áp dụng
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--fg)]">
              {activeCount}
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              / {regulations.length} tổng số
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Tiêu chuẩn Bắt buộc
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--danger)]">
              {mandatoryCount}
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              điều kiện kiểm tra
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Căn cứ Pháp luật & DVC
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--primary)]">
              {connectedLegalCount}
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              văn bản kết nối
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Checklist Đối soát HĐ
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--success)]">
              {totalChecklistItems}
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              mục kiểm tra con
            </span>
          </div>
        </div>
      </div>

      {/* ═══ SMART TOOLBAR: FILTERS, SEARCH & ACTIONS ═══ */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs space-y-3">
        {/* Top bar: Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddModal}
              data-testid="btn-add-regulation"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Quy định Mới</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSimulatorOpen(true)}
              data-testid="btn-live-simulator"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] text-xs font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              <Eye className="w-4 h-4 text-[var(--primary)]" />
              <span>Giả lập Giao diện Người dùng</span>
            </button>

            <button
              type="button"
              onClick={handleResetBaseline}
              data-testid="btn-reset-baseline"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] text-xs font-semibold hover:text-[var(--danger)] hover:border-[var(--danger)] transition-colors"
              title="Khôi phục 10 quy định chuẩn ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục Baseline</span>
            </button>
          </div>

          {/* Quick Stats Helper */}
          <div className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
            <GripVertical className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>Kéo thả tay nắm để sắp xếp thứ tự ưu tiên</span>
          </div>
        </div>

        {/* Filter Bar: Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-[var(--border)] pt-3 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
            }`}
          >
            Tất cả danh mục ({regulations.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as RegulationCategory[]).map(
            catKey => {
              const count = regulations.filter(
                r => r.category === catKey
              ).length
              const Icon = CATEGORY_LABELS[catKey].icon
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === catKey
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{CATEGORY_LABELS[catKey].label}</span>
                  <span className="opacity-75 font-mono text-[10px]">
                    ({count})
                  </span>
                </button>
              )
            }
          )}
        </div>

        {/* Search & Secondary Filter dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Tìm kiếm mã, tên quy định hoặc căn cứ luật..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedSeverity}
              onChange={e =>
                setSelectedSeverity(
                  e.target.value as 'all' | RegulationSeverity
                )
              }
              className="w-full py-2 px-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="all">Tất cả mức độ tuân thủ</option>
              <option value="mandatory">Bắt buộc tuân thủ</option>
              <option value="recommended">Khuyến nghị tiêu chuẩn</option>
              <option value="optional">Thỏa thuận tự chọn</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={e =>
                setSelectedStatus(
                  e.target.value as 'all' | 'active' | 'inactive'
                )
              }
              className="w-full py-2 px-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Chỉ quy định Đang Áp Dụng</option>
              <option value="inactive">Chỉ quy định Tạm Dừng</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══ REGULATION LIST WITH DRAG & DROP ═══ */}
      <div className="space-y-3" data-testid="regulations-list-container">
        {filteredRegulations.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] space-y-2">
            <FileText className="w-8 h-8 mx-auto text-[var(--muted)]" />
            <p className="text-xs font-semibold text-[var(--fg)]">
              Không tìm thấy quy định nào phù hợp với bộ lọc hiện tại.
            </p>
            <p className="text-[11px] text-[var(--muted)]">
              Thử thay đổi từ khóa tìm kiếm hoặc bấm Khôi phục Baseline.
            </p>
          </div>
        ) : (
          filteredRegulations.map((reg, index) => {
            const isDragging = draggedIndex === index
            const isOver = dragOverIndex === index
            const severityStyle = SEVERITY_LABELS[reg.severity]
            const legalData = reg.linkedLegalKey
              ? OFFICIAL_PROCEDURES_DATA[reg.linkedLegalKey]
              : null

            return (
              <div
                key={reg.id}
                data-testid={`regulation-card-${reg.code}`}
                draggable
                onDragStart={e => handleDragStart(e, index)}
                onDragOver={e => handleDragOver(e, index)}
                onDrop={e => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`p-4 rounded-xl border transition-all duration-150 ${
                  isDragging
                    ? 'opacity-40 border-dashed border-[var(--primary)] bg-[var(--surface-muted)] scale-[0.99]'
                    : isOver
                      ? 'border-[var(--primary)] shadow-md bg-[var(--primary)]/5'
                      : reg.isActive
                        ? 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] shadow-2xs'
                        : 'border-[var(--border)] bg-[var(--surface-muted)] opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Drag Handle & Main Info */}
                  <div className="flex items-start gap-3 flex-1">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing p-1 text-[var(--muted)] hover:text-[var(--primary)] rounded transition-colors mt-0.5"
                      title="Kéo để thay đổi thứ tự ưu tiên"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    {/* Order Index Badge */}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]">
                      {index + 1}
                    </span>

                    {/* Content */}
                    <div className="space-y-1.5 flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-[var(--surface-muted)] text-[var(--fg)] border border-[var(--border)]">
                          {reg.code}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${severityStyle.bgClass} ${severityStyle.textClass} ${severityStyle.borderClass}`}
                        >
                          {severityStyle.label}
                        </span>

                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]">
                          {CATEGORY_LABELS[reg.category].label}
                        </span>

                        {reg.scope.map(sc => (
                          <span
                            key={sc}
                            className="px-1.5 py-0.5 rounded text-[10px] text-[var(--muted)] bg-[var(--surface-muted)] border border-[var(--border)]"
                          >
                            {SCOPE_LABELS[sc]}
                          </span>
                        ))}
                      </div>

                      {/* Title & Summary */}
                      <h4 className="text-sm font-bold text-[var(--fg)] leading-snug">
                        {reg.title}
                      </h4>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">
                        {reg.summary}
                      </p>

                      {/* Linked Legal Foundation */}
                      {legalData && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setDetailModalKey(reg.linkedLegalKey!)
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] hover:underline"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>
                              Căn cứ: {legalData.code} ({legalData.title})
                            </span>
                            <Eye className="w-3 h-3 ml-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Checklist preview */}
                      {reg.checklistItems.length > 0 && (
                        <div className="mt-2 p-2.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] space-y-1">
                          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wide block">
                            Điều kiện đối soát HĐ ({reg.checklistItems.length}{' '}
                            mục):
                          </span>
                          <ul className="space-y-1 text-[11px] text-[var(--fg)]">
                            {reg.checklistItems.map(item => (
                              <li
                                key={item.id}
                                className="flex items-start gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                                <div>
                                  <span>{item.label}</span>
                                  {item.hint && (
                                    <span className="text-[10px] text-[var(--muted)] block">
                                      ({item.hint})
                                    </span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Actions & Toggle */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Active Toggle Switch */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[var(--muted)] font-medium">
                        {reg.isActive ? 'Áp dụng' : 'Tạm dừng'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(reg.id)}
                        data-testid={`toggle-status-${reg.code}`}
                        aria-label={`Bật tắt trạng thái quy định ${reg.code}`}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          reg.isActive
                            ? 'bg-[var(--success)]'
                            : 'bg-[var(--border-strong)]'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            reg.isActive ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Button Group */}
                    <div className="flex items-center gap-1">
                      {/* Priority Up/Down */}
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        aria-label="Đẩy lên trên"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === regulations.length - 1}
                        aria-label="Hạ xuống dưới"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => handleDuplicate(reg)}
                        aria-label="Nhân bản quy định"
                        title="Tạo bản sao quy định"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(reg)}
                        data-testid={`btn-edit-${reg.code}`}
                        aria-label="Chỉnh sửa quy định"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(reg.id, reg.code)}
                        data-testid={`btn-delete-${reg.code}`}
                        aria-label="Xóa quy định"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* ═══ ADD / EDIT REGULATION MODAL ═══ */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-sm font-bold text-[var(--fg)]">
                  {editingRegulation
                    ? `Chỉnh sửa Quy định: ${editingRegulation.code}`
                    : 'Thêm mới Quy định Nền tảng'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[var(--muted)] hover:text-[var(--fg)] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form
              onSubmit={handleSaveForm}
              className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
            >
              {formError && (
                <div className="p-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-[var(--danger)] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Code & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[var(--fg)] block mb-1">
                    Mã Quy định:
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    placeholder="VD: REG-FIRE-05"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] font-mono font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-[var(--fg)] block mb-1">
                    Tên Tiêu đề Quy định:
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="VD: Tiêu chuẩn an toàn PCCC khi sạc xe điện"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                  />
                </div>
              </div>

              {/* Category & Severity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[var(--fg)] block mb-1">
                    Phân loại Danh mục:
                  </label>
                  <select
                    value={formCategory}
                    onChange={e =>
                      setFormCategory(e.target.value as RegulationCategory)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                  >
                    {(Object.keys(CATEGORY_LABELS) as RegulationCategory[]).map(
                      k => (
                        <option key={k} value={k}>
                          {CATEGORY_LABELS[k].label}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[var(--fg)] block mb-1">
                    Mức độ Tuân thủ:
                  </label>
                  <select
                    value={formSeverity}
                    onChange={e =>
                      setFormSeverity(e.target.value as RegulationSeverity)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                  >
                    <option value="mandatory">
                      Bắt buộc tuân thủ (Chặn ký nếu thiếu)
                    </option>
                    <option value="recommended">Khuyến nghị tiêu chuẩn</option>
                    <option value="optional">Thỏa thuận tự chọn</option>
                  </select>
                </div>
              </div>

              {/* Linked Legal Foundation */}
              <div>
                <label className="font-semibold text-[var(--fg)] block mb-1">
                  Căn cứ Pháp luật / Thủ tục DVC Liên kết (Chuẩn Quốc Gia):
                </label>
                <select
                  value={formLinkedLegalKey}
                  onChange={e =>
                    setFormLinkedLegalKey(
                      e.target.value as PublicServiceProcedureKey | ''
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                >
                  <option value="">-- Không liên kết trực tiếp --</option>
                  {(
                    Object.keys(
                      OFFICIAL_PROCEDURES_DATA
                    ) as PublicServiceProcedureKey[]
                  ).map(key => {
                    const item = OFFICIAL_PROCEDURES_DATA[key]
                    return (
                      <option key={key} value={key}>
                        {item.code} - {item.title}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Summary description */}
              <div>
                <label className="font-semibold text-[var(--fg)] block mb-1">
                  Nội dung Tóm tắt Yêu cầu:
                </label>
                <textarea
                  rows={3}
                  required
                  value={formSummary}
                  onChange={e => setFormSummary(e.target.value)}
                  placeholder="Mô tả cụ thể quyền, nghĩa vụ và trách nhiệm thực hiện của các bên..."
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] leading-relaxed"
                />
              </div>

              {/* Scope Checkboxes */}
              <div>
                <label className="font-semibold text-[var(--fg)] block mb-1">
                  Phạm vi Loại hình BĐS Áp dụng:
                </label>
                <div className="flex flex-wrap gap-3 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]">
                  {(Object.keys(SCOPE_LABELS) as PropertyScope[]).map(sc => {
                    const isChecked = formScope.includes(sc)
                    return (
                      <label
                        key={sc}
                        className="inline-flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={e => {
                            if (e.target.checked) {
                              setFormScope([...formScope, sc])
                            } else {
                              setFormScope(formScope.filter(s => s !== sc))
                            }
                          }}
                          className="rounded text-[var(--primary)] focus:ring-0"
                        />
                        <span>{SCOPE_LABELS[sc]}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Dynamic Checklist Builder */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-[var(--fg)]">
                    Danh sách Tiêu chí Đối soát Con (Checklist Items):
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormChecklist([
                        ...formChecklist,
                        { id: `chk-${Date.now()}`, label: '', hint: '' },
                      ])
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--primary)] hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Thêm tiêu chí</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formChecklist.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-start gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]"
                    >
                      <span className="text-[11px] font-mono text-[var(--muted)] mt-2">
                        #{idx + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          placeholder="Tiêu chí kiểm tra (VD: Bình chữa cháy còn hạn sử dụng)"
                          value={item.label}
                          onChange={e => {
                            const updated = [...formChecklist]
                            if (updated[idx]) {
                              updated[idx]!.label = e.target.value
                              setFormChecklist(updated)
                            }
                          }}
                          className="w-full px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                        />
                        <input
                          type="text"
                          placeholder="Ghi chú hướng dẫn (Không bắt buộc)"
                          value={item.hint ?? ''}
                          onChange={e => {
                            const updated = [...formChecklist]
                            if (updated[idx]) {
                              updated[idx]!.hint = e.target.value
                              setFormChecklist(updated)
                            }
                          }}
                          className="w-full px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--muted)]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormChecklist(
                            formChecklist.filter((_, i) => i !== idx)
                          )
                        }
                        disabled={formChecklist.length === 1}
                        className="p-1.5 text-[var(--muted)] hover:text-[var(--danger)] rounded disabled:opacity-30 mt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--fg)] hover:bg-[var(--surface-muted)]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  data-testid="btn-save-regulation"
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90"
                >
                  {editingRegulation ? 'Lưu Thay Đổi' : 'Tạo Quy Định Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ LIVE USER SIMULATOR MODAL ═══ */}
      {isSimulatorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsSimulatorOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">
                    Trình Giả Lập Giao Diện Người Dùng (Live User Preview)
                  </h3>
                  <p className="text-[11px] text-[var(--muted)]">
                    Xem trước cách Người thuê và Chủ nhà nhìn thấy các Quy định
                    Nền tảng & Căn cứ Dịch vụ công trong Không gian hợp đồng.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSimulatorOpen(false)}
                className="p-1 text-[var(--muted)] hover:text-[var(--fg)] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                  <span className="font-bold text-[var(--fg)] uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                    Bộ Quy chuẩn & Checklist Tuân thủ (Đang áp dụng trên Sàn)
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {regulations.filter(r => r.isActive).length} quy định hoạt
                    động
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {regulations
                    .filter(r => r.isActive)
                    .map(reg => {
                      const sev = SEVERITY_LABELS[reg.severity]
                      return (
                        <div
                          key={reg.id}
                          className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[10px] text-[var(--primary)] bg-[var(--primary-soft)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                              {reg.code}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sev.bgClass} ${sev.textClass}`}
                            >
                              {sev.label}
                            </span>
                          </div>
                          <h5 className="font-bold text-xs text-[var(--fg)]">
                            {reg.title}
                          </h5>
                          <p className="text-[11px] text-[var(--muted)] line-clamp-2">
                            {reg.summary}
                          </p>
                          {reg.checklistItems.length > 0 && (
                            <div className="pt-1 text-[10px] text-[var(--muted)]">
                              Checklist:{' '}
                              {reg.checklistItems.map(c => c.label).join(' • ')}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-6 py-3 text-right">
              <button
                type="button"
                onClick={() => setIsSimulatorOpen(false)}
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90"
              >
                Đóng Trình Giả Lập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL FOR STATUTORY LAWS / DVC PROCEDURES ═══ */}
      <PublicServiceDetailModal
        procedureKey={detailModalKey}
        onClose={() => setDetailModalKey(null)}
      />
    </div>
  )
}
