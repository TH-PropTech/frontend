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
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  Sliders,
  Trash2,
  X,
} from 'lucide-react'
import {
  PublicServiceDetailModal,
  createPlatformRegulation,
  deletePlatformRegulation,
  getAdminLegalSources,
  getAdminPlatformRegulations,
  getLegalAdminErrorMessage,
  reorderPlatformRegulations,
  updatePlatformRegulation,
  type LegalSource,
  type PlatformRegulation,
  type PlatformRegulationInput,
  type PropertyScope,
  type RegulationCategory,
  type RegulationChecklistItem,
  type RegulationSeverity,
} from '@/features/contracts'

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

function toInput(reg: PlatformRegulation): PlatformRegulationInput {
  return {
    code: reg.code,
    title: reg.title,
    summary: reg.summary,
    category: reg.category,
    severity: reg.severity,
    scope: reg.scope,
    linkedSourceKey: reg.linkedSourceKey,
    checklistItems: reg.checklistItems,
    isActive: reg.isActive,
  }
}

/** Trả về bản sao danh sách với phần tử `fromId` chuyển tới vị trí của `toId` */
function moveById(
  list: PlatformRegulation[],
  fromId: string,
  toId: string
): PlatformRegulation[] {
  const from = list.findIndex(r => r.id === fromId)
  const to = list.findIndex(r => r.id === toId)
  if (from < 0 || to < 0 || from === to) return list
  const updated = [...list]
  const [moved] = updated.splice(from, 1)
  if (moved) updated.splice(to, 0, moved)
  return updated
}

export function PublicServicesAdminTab(): React.ReactElement {
  const [regulations, setRegulations] = React.useState<PlatformRegulation[]>([])
  const [sources, setSources] = React.useState<LegalSource[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [loadAttempt, setLoadAttempt] = React.useState(0)
  const [isSaving, setIsSaving] = React.useState(false)
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
  const [detailSource, setDetailSource] = React.useState<LegalSource | null>(
    null
  )
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
  const [formLinkedSourceKey, setFormLinkedSourceKey] = React.useState('')
  const [formChecklist, setFormChecklist] = React.useState<
    Array<{ id: string; label: string; hint?: string | undefined }>
  >([{ id: 'chk-1', label: '', hint: '' }])
  const [formError, setFormError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    Promise.all([getAdminPlatformRegulations(), getAdminLegalSources()])
      .then(([regs, srcs]) => {
        if (!active) return
        setRegulations(regs)
        setSources(srcs)
        setLoadError(null)
      })
      .catch((err: unknown) => {
        if (active) setLoadError(getLegalAdminErrorMessage(err))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [loadAttempt])

  const handleRetryLoad = () => {
    setIsLoading(true)
    setLoadAttempt(n => n + 1)
  }

  const sourceByKey = React.useMemo(
    () => new Map(sources.map(s => [s.key, s])),
    [sources]
  )

  const showNotification = (
    text: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const replaceRegulation = (saved: PlatformRegulation) => {
    setRegulations(list => list.map(r => (r.id === saved.id ? saved : r)))
  }

  /** Cập nhật thứ tự lạc quan; hoàn tác nếu API lỗi */
  const persistOrder = async (
    reordered: PlatformRegulation[],
    message: string
  ) => {
    const previous = regulations
    setRegulations(reordered)
    try {
      setRegulations(await reorderPlatformRegulations(reordered.map(r => r.id)))
      showNotification(message)
    } catch (err) {
      setRegulations(previous)
      showNotification(getLegalAdminErrorMessage(err), 'error')
    }
  }

  // Drag and Drop Handlers (index theo danh sách đang lọc → quy đổi sang id)
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
    const moved =
      draggedIndex === null ? undefined : filteredRegulations[draggedIndex]
    const target = filteredRegulations[targetIndex]
    setDraggedIndex(null)
    setDragOverIndex(null)
    if (!moved || !target || moved.id === target.id) return
    void persistOrder(
      moveById(regulations, moved.id, target.id),
      `Đã chuyển quy định "${moved.code}" sang vị trí mới`
    )
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // Move buttons for accessibility
  const handleMove = (reg: PlatformRegulation, offset: -1 | 1) => {
    const index = regulations.findIndex(r => r.id === reg.id)
    const neighbour = regulations[index + offset]
    if (!neighbour) return
    void persistOrder(
      moveById(regulations, reg.id, neighbour.id),
      offset < 0
        ? `Đã đẩy quy định "${reg.code}" lên thứ tự ưu tiên cao hơn`
        : `Đã hạ quy định "${reg.code}" xuống thứ tự phía sau`
    )
  }

  const handleToggleStatus = async (reg: PlatformRegulation) => {
    const nextState = !reg.isActive
    try {
      replaceRegulation(
        await updatePlatformRegulation(reg.id, { isActive: nextState })
      )
      showNotification(
        `${nextState ? 'Kích hoạt' : 'Tạm dừng'} áp dụng quy định [${reg.code}]`
      )
    } catch (err) {
      showNotification(getLegalAdminErrorMessage(err), 'error')
    }
  }

  const handleDelete = async (reg: PlatformRegulation) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa quy định [${reg.code}] khỏi danh mục nền tảng?`
      )
    ) {
      return
    }
    try {
      await deletePlatformRegulation(reg.id)
      setRegulations(list => list.filter(r => r.id !== reg.id))
      showNotification(`Đã xóa quy định [${reg.code}] thành công`, 'info')
    } catch (err) {
      showNotification(getLegalAdminErrorMessage(err), 'error')
    }
  }

  const handleDuplicate = async (reg: PlatformRegulation) => {
    try {
      const created = await createPlatformRegulation({
        ...toInput(reg),
        code: `${reg.code}-COPY`,
        title: `${reg.title} (Bản sao)`,
      })
      setRegulations(list => [...list, created])
      showNotification(`Đã nhân bản quy định mới [${created.code}]`)
    } catch (err) {
      showNotification(getLegalAdminErrorMessage(err), 'error')
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
    setFormLinkedSourceKey('')
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
    setFormLinkedSourceKey(reg.linkedSourceKey ?? '')
    setFormChecklist(
      reg.checklistItems.length > 0
        ? reg.checklistItems.map(c => ({ ...c }))
        : [{ id: `chk-${Date.now()}-1`, label: '', hint: '' }]
    )
    setFormError(null)
    setIsAddModalOpen(true)
  }

  // Save Modal Form — lỗi API giữ modal mở với dữ liệu đã nhập
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCode.trim() || !formTitle.trim() || !formSummary.trim()) {
      setFormError(
        'Vui lòng nhập đầy đủ Mã quy định, Tiêu đề và Nội dung tóm tắt.'
      )
      return
    }

    const checklistItems: RegulationChecklistItem[] = formChecklist
      .filter(item => item.label.trim().length > 0)
      .map((item, idx) => ({
        id: item.id || `chk-${Date.now()}-${idx}`,
        label: item.label.trim(),
        ...(item.hint?.trim() ? { hint: item.hint.trim() } : {}),
      }))

    const input: PlatformRegulationInput = {
      code: formCode.trim().toUpperCase(),
      title: formTitle.trim(),
      summary: formSummary.trim(),
      category: formCategory,
      severity: formSeverity,
      scope: formScope.length > 0 ? formScope : ['all'],
      linkedSourceKey: formLinkedSourceKey || null,
      checklistItems,
    }

    setIsSaving(true)
    setFormError(null)
    try {
      if (editingRegulation) {
        replaceRegulation(
          await updatePlatformRegulation(editingRegulation.id, input)
        )
        showNotification(`Đã cập nhật quy định [${input.code}] thành công!`)
      } else {
        const created = await createPlatformRegulation(input)
        setRegulations(list => [...list, created])
        showNotification(`Đã thêm mới quy định [${created.code}] vào hệ thống!`)
      }
      setIsAddModalOpen(false)
    } catch (err) {
      setFormError(getLegalAdminErrorMessage(err))
    } finally {
      setIsSaving(false)
    }
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
        reg.linkedSourceKey &&
        sourceByKey.get(reg.linkedSourceKey)?.title.toLowerCase().includes(q)
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
    regulations.map(r => r.linkedSourceKey).filter(Boolean)
  ).size

  if (isLoading) {
    return (
      <div
        data-testid="public-services-admin-loading"
        className="p-8 text-center text-xs text-[var(--muted)] flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4 animate-spin text-[var(--primary)]" />
        <span>Đang tải quy định nền tảng...</span>
      </div>
    )
  }

  if (loadError) {
    return (
      <div
        data-testid="public-services-admin-error"
        className="p-4 rounded-xl border border-[var(--danger)] bg-[var(--danger)]/10 text-xs text-[var(--danger)] flex items-center justify-between gap-3"
      >
        <span>{loadError}</span>
        <button
          type="button"
          onClick={handleRetryLoad}
          className="font-semibold underline underline-offset-2"
        >
          Thử lại
        </button>
      </div>
    )
  }

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
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.
            </p>
          </div>
        ) : (
          filteredRegulations.map((reg, index) => {
            const isDragging = draggedIndex === index
            const isOver = dragOverIndex === index
            const severityStyle = SEVERITY_LABELS[reg.severity]
            const legalData = reg.linkedSourceKey
              ? sourceByKey.get(reg.linkedSourceKey)
              : undefined
            const fullIndex = regulations.findIndex(r => r.id === reg.id)

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
                            onClick={() => setDetailSource(legalData)}
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
                        onClick={() => void handleToggleStatus(reg)}
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
                        onClick={() => handleMove(reg, -1)}
                        disabled={fullIndex === 0}
                        aria-label="Đẩy lên trên"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(reg, 1)}
                        disabled={fullIndex === regulations.length - 1}
                        aria-label="Hạ xuống dưới"
                        className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => void handleDuplicate(reg)}
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
                        onClick={() => void handleDelete(reg)}
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
              onSubmit={e => void handleSaveForm(e)}
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
                  value={formLinkedSourceKey}
                  onChange={e => setFormLinkedSourceKey(e.target.value)}
                  data-testid="select-linked-source"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
                >
                  <option value="">-- Không liên kết trực tiếp --</option>
                  {sources.map(item => (
                    <option key={item.key} value={item.key}>
                      {item.code} - {item.title}
                      {item.isActive ? '' : ' (đang tắt)'}
                    </option>
                  ))}
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
                  disabled={isSaving}
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {isSaving
                    ? 'Đang lưu...'
                    : editingRegulation
                      ? 'Lưu Thay Đổi'
                      : 'Tạo Quy Định Mới'}
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
        source={detailSource}
        onClose={() => setDetailSource(null)}
      />
    </div>
  )
}
