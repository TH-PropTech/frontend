'use client'

import { OptionSelect } from '@/shared/ui/option-select'
import * as React from 'react'
import {
  Layers,
  Plus,
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import {
  getRentalFlowAssignments,
  activateRentalFlowAssignment,
  previewRentalFlowAssignment,
  type RentalFlowAssignment,
  type RentalFlowProfile,
  type PreviewFlowAssignmentResult,
} from '../api/rental-flow-api'
import { ImpactAnalysisModal } from './impact-analysis-modal'

const ASSIGNMENTS_PAGE_SIZE = 10

interface AssignmentManagerProps {
  publishedProfiles: RentalFlowProfile[]
  onAssignmentCreated?: () => void
}

export function AssignmentManager({
  publishedProfiles,
  onAssignmentCreated,
}: AssignmentManagerProps): React.ReactElement {
  const [assignments, setAssignments] = React.useState<RentalFlowAssignment[]>(
    []
  )
  const [loading, setLoading] = React.useState(false)
  const [scopeFilter, setScopeFilter] = React.useState('ALL')
  const [statusFilter, setStatusFilter] = React.useState('ALL')
  const [page, setPage] = React.useState(1)
  const [error, setError] = React.useState<string | null>(null)
  const [isImpactModalOpen, setIsImpactModalOpen] = React.useState(false)

  // Activation form states
  const [isActivating, setIsActivating] = React.useState(false)
  const [scope, setScope] = React.useState<'GLOBAL' | 'DURATION' | 'PACKAGE'>(
    'GLOBAL'
  )
  const [scopeValue, setScopeValue] = React.useState('')
  const [selectedProfileId, setSelectedProfileId] = React.useState(
    publishedProfiles[0]?.profileId || ''
  )
  const [submitting, setSubmitting] = React.useState(false)

  // Resolution preview state
  const [previewDuration, setPreviewDuration] = React.useState<number>(12)
  const [previewPackageId, setPreviewPackageId] = React.useState<string>('')
  const [previewResult, setPreviewResult] =
    React.useState<PreviewFlowAssignmentResult | null>(null)
  const [previewLoading, setPreviewLoading] = React.useState(false)

  const effectiveProfileId =
    selectedProfileId || publishedProfiles[0]?.profileId || ''

  const filteredAssignments = React.useMemo(
    () =>
      assignments.filter(
        asgn =>
          (scopeFilter === 'ALL' || asgn.scope === scopeFilter) &&
          (statusFilter === 'ALL' ||
            (statusFilter === 'ACTIVE') === !asgn.supersededAt)
      ),
    [assignments, scopeFilter, statusFilter]
  )
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAssignments.length / ASSIGNMENTS_PAGE_SIZE)
  )
  const currentPage = Math.min(page, totalPages)
  const pageAssignments = filteredAssignments.slice(
    (currentPage - 1) * ASSIGNMENTS_PAGE_SIZE,
    currentPage * ASSIGNMENTS_PAGE_SIZE
  )

  const fetchAssignments = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getRentalFlowAssignments()
      setAssignments(data)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải danh sách gán cấu hình'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    getRentalFlowAssignments()
      .then(data => {
        if (isMounted) {
          setAssignments(data)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải danh sách gán cấu hình'
          )
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  const handleActivate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const targetProf = publishedProfiles.find(
      p => p.profileId === effectiveProfileId
    )
    if (!targetProf) {
      setError('Vui lòng chọn một Flow Profile đã xuất bản hợp lệ.')
      return
    }

    if (scope !== 'GLOBAL' && !scopeValue.trim()) {
      setError(`Vui lòng nhập giá trị phạm vi cho ${scope}.`)
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await activateRentalFlowAssignment({
        scope,
        scopeValue: scope !== 'GLOBAL' ? scopeValue.trim() : undefined,
        profileId: targetProf.profileId,
        version: targetProf.version,
        contentHash: targetProf.contentHash,
      })
      setIsActivating(false)
      setScopeValue('')
      await fetchAssignments()
      onAssignmentCreated?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Kích hoạt gán cấu hình thất bại'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleTestResolution = async (): Promise<void> => {
    setPreviewLoading(true)
    try {
      const result = await previewRentalFlowAssignment({
        durationMonths: previewDuration,
        packageId: previewPackageId.trim() || undefined,
      })
      setPreviewResult(result)
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Kiểm tra phân giải thất bại'
      )
    } finally {
      setPreviewLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-sm font-bold text-fg">
              Quản lý Gán Cấu hình (Flow Assignments)
            </h3>
            <p className="text-[11px] text-muted">
              Định tuyến luồng thuê theo thứ tự ưu tiên: Mặc định an toàn &lt;
              GLOBAL &lt; DURATION &lt; PACKAGE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsImpactModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-surface-muted border border-border text-fg hover:border-primary/50 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Kiểm tra tác động hợp đồng
          </button>

          <button
            type="button"
            onClick={() => setIsActivating(!isActivating)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Kích hoạt gán mới
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Activation Drawer / Box */}
      {isActivating && (
        <form
          onSubmit={handleActivate}
          className="p-5 bg-surface rounded-xl border border-primary/30 shadow-sm space-y-4 animate-in fade-in duration-200"
        >
          <h4 className="text-xs font-bold text-fg flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-primary" />
            Tạo cấu hình kích hoạt mới
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Phạm vi áp dụng (Scope)
              </label>
              <OptionSelect
                value={scope}
                onChange={val => {
                  setScope(val as 'GLOBAL' | 'DURATION' | 'PACKAGE')
                  if (val === 'DURATION') setScopeValue('12')
                  else setScopeValue('')
                }}
                options={[
                  { value: 'GLOBAL', label: 'GLOBAL (Toàn sàn)' },
                  { value: 'DURATION', label: 'DURATION (Thời hạn gói)' },
                  { value: 'PACKAGE', label: 'PACKAGE (Gói thuê cụ thể)' },
                ]}
              />
            </div>

            {scope === 'DURATION' && (
              <div>
                <label className="block text-xs font-semibold text-fg mb-1">
                  Thời hạn áp dụng (Tháng)
                </label>
                <OptionSelect
                  value={scopeValue}
                  onChange={setScopeValue}
                  options={[
                    { value: '1', label: '1 tháng (legacy)', disabled: true },
                    { value: '3', label: '3 tháng' },
                    { value: '6', label: '6 tháng' },
                    { value: '12', label: '12 tháng' },
                    { value: '24', label: '24 tháng' },
                  ]}
                />
              </div>
            )}

            {scope === 'PACKAGE' && (
              <div>
                <label className="block text-xs font-semibold text-fg mb-1">
                  Mã gói thuê (Package ID)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: pkg-apartment-456"
                  value={scopeValue}
                  onChange={e => setScopeValue(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Hồ sơ luồng đích (Published Profile)
              </label>
              <OptionSelect
                value={effectiveProfileId}
                onChange={setSelectedProfileId}
                options={publishedProfiles.map(p => ({
                  value: p.profileId,
                  label: `${p.name} (v${p.version})`,
                }))}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsActivating(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-muted border border-border text-muted hover:text-fg"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
            >
              {submitting ? 'Đang kích hoạt...' : 'Kích hoạt ngay'}
            </button>
          </div>
        </form>
      )}

      {/* Assignment Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-3">
          <div className="w-44">
            <OptionSelect
              value={scopeFilter}
              onChange={value => {
                setScopeFilter(value)
                setPage(1)
              }}
              options={[
                { value: 'ALL', label: 'Mọi phạm vi' },
                { value: 'GLOBAL', label: 'GLOBAL' },
                { value: 'DURATION', label: 'DURATION' },
                { value: 'PACKAGE', label: 'PACKAGE' },
              ]}
            />
          </div>
          <div className="w-44">
            <OptionSelect
              value={statusFilter}
              onChange={value => {
                setStatusFilter(value)
                setPage(1)
              }}
              options={[
                { value: 'ALL', label: 'Mọi trạng thái' },
                { value: 'ACTIVE', label: 'Đang hiệu lực' },
                { value: 'SUPERSEDED', label: 'Đã bị thay thế' },
              ]}
            />
          </div>
          <span className="ml-auto text-[11px] text-muted">
            {filteredAssignments.length} bản ghi
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-muted text-muted font-semibold">
                <th className="py-3 px-4">Mã gán (ID)</th>
                <th className="py-3 px-4">Phạm vi (Scope)</th>
                <th className="py-3 px-4">Hồ sơ đích & Phiên bản</th>
                <th className="py-3 px-4">Mã băm (SHA-256)</th>
                <th className="py-3 px-4">Thời điểm hiệu lực</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted">
                    <RefreshCw className="w-4 h-4 animate-spin inline mr-2 text-primary" />
                    Đang tải danh sách phân bổ...
                  </td>
                </tr>
              ) : filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted">
                    Không có cấu hình gán nào khớp bộ lọc.
                  </td>
                </tr>
              ) : (
                pageAssignments.map(asgn => {
                  const isSuperseded = Boolean(asgn.supersededAt)
                  return (
                    <tr
                      key={asgn.assignmentId}
                      className="hover:bg-surface-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-fg">
                        {asgn.assignmentId.slice(0, 12)}...
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            asgn.scope === 'PACKAGE'
                              ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                              : asgn.scope === 'DURATION'
                                ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          }`}
                        >
                          {asgn.scope}
                          {asgn.scopeValue ? `: ${asgn.scopeValue}` : ''}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-fg">
                          {asgn.profileRef.profileId}
                        </span>
                        <span className="ml-1.5 text-[10px] text-muted">
                          v{asgn.profileRef.version}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-muted truncate max-w-[120px]">
                        {asgn.profileRef.contentHash.slice(0, 16)}...
                      </td>
                      <td className="py-3 px-4 text-muted">
                        {new Date(asgn.effectiveAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3 px-4">
                        {isSuperseded ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted bg-surface-muted px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" />
                            Đã bị thay thế
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            Đang hiệu lực
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 ? (
          <div className="flex items-center justify-between border-t border-border p-3 text-xs">
            <span className="text-muted">
              Trang {currentPage}/{totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-lg border border-border px-3 py-1.5 font-semibold text-fg transition-colors hover:border-primary disabled:opacity-50"
              >
                Trước
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-lg border border-border px-3 py-1.5 font-semibold text-fg transition-colors hover:border-primary disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Precedence Resolution Tester */}
      <div className="p-5 bg-surface rounded-xl border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-fg flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              Công cụ thử nghiệm phân giải thứ tự ưu tiên (Precedence Sandbox)
            </h4>
            <p className="text-[11px] text-muted">
              Kiểm tra trực tiếp xem khách thuê chọn thời hạn hoặc mã gói cụ thể
              sẽ nhận được hồ sơ nào
            </p>
          </div>
          <button
            type="button"
            onClick={handleTestResolution}
            disabled={previewLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-surface-muted border border-border text-fg hover:border-primary transition-colors"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${previewLoading ? 'animate-spin' : ''}`}
            />
            Chạy kiểm tra phân giải
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-muted mb-1">
              Thời hạn gói (Duration Months)
            </label>
            <OptionSelect
              value={String(previewDuration)}
              onChange={value => setPreviewDuration(Number(value))}
              options={[
                { value: '1', label: '1 tháng (legacy)', disabled: true },
                { value: '3', label: '3 tháng' },
                { value: '6', label: '6 tháng' },
                { value: '12', label: '12 tháng' },
                { value: '24', label: '24 tháng' },
              ]}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-muted mb-1">
              Mã gói thuê (Tùy chọn)
            </label>
            <input
              type="text"
              placeholder="Để trống hoặc nhập packageId"
              value={previewPackageId}
              onChange={e => setPreviewPackageId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg"
            />
          </div>
        </div>

        {previewResult && (
          <div className="p-3.5 bg-surface-muted rounded-xl border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-fg">
              <span className="text-primary">Kết quả phân giải:</span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {previewResult.resolvedFrom.scope}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted" />
              <span>
                {previewResult.resolvedFrom.profileName} (v
                {previewResult.resolvedFrom.version})
              </span>
            </div>
            <div className="text-[11px] text-muted font-mono">
              Mã băm SHA-256: {previewResult.resolvedFrom.contentHash}
            </div>
          </div>
        )}
      </div>

      <ImpactAnalysisModal
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
      />
    </div>
  )
}
