'use client'

import * as React from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Edit2,
  Loader2,
  RefreshCw,
  Save,
  Search,
  Sliders,
  X,
} from 'lucide-react'
import {
  getAdminPolicies,
  updatePolicy,
  updatePolicyStatus,
  type AdminPolicyItem,
} from '@/features/legal-terms/api/legal-terms-api'

export function OperationalPoliciesAdminTab(): React.ReactElement {
  const [policies, setPolicies] = React.useState<AdminPolicyItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )
  const [searchQuery, setSearchQuery] = React.useState('')

  // Inline editing state
  const [editingKey, setEditingKey] = React.useState<string | null>(null)
  const [editValue, setEditValue] = React.useState('')
  const [savingKey, setSavingKey] = React.useState<string | null>(null)

  const reloadPolicies = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    setSuccessMessage(null)
    try {
      const list = await getAdminPolicies()
      setPolicies(list)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải danh sách chính sách vận hành'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let active = true
    getAdminPolicies()
      .then(list => {
        if (active) setPolicies(list)
      })
      .catch(err => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải danh sách chính sách vận hành'
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleStartEdit = (policy: AdminPolicyItem): void => {
    setEditingKey(policy.key)
    setEditValue(policy.value)
    setError(null)
    setSuccessMessage(null)
  }

  const handleCancelEdit = (): void => {
    setEditingKey(null)
    setEditValue('')
  }

  const handleSaveValue = async (key: string): Promise<void> => {
    setSavingKey(key)
    setError(null)
    setSuccessMessage(null)
    try {
      const updated = await updatePolicy(key, editValue.trim())
      setPolicies(prev =>
        prev.map(p => (p.key === key ? { ...p, ...updated } : p))
      )
      setEditingKey(null)
      setSuccessMessage(`Đã cập nhật giá trị chính sách [${key}] thành công!`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Lỗi cập nhật giá trị. Giá trị có thể không hợp lệ theo quy định.'
      )
    } finally {
      setSavingKey(null)
    }
  }

  const handleToggleStatus = async (policy: AdminPolicyItem): Promise<void> => {
    const nextStatus = policy.status === 'active' ? 'inactive' : 'active'
    setSavingKey(policy.key)
    setError(null)
    setSuccessMessage(null)
    try {
      const updated = await updatePolicyStatus(policy.key, nextStatus)
      setPolicies(prev =>
        prev.map(p => (p.key === policy.key ? { ...p, ...updated } : p))
      )
      setSuccessMessage(
        `Đã chuyển trạng thái [${policy.key}] sang ${nextStatus.toUpperCase()}`
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể chuyển đổi trạng thái chính sách'
      )
    } finally {
      setSavingKey(null)
    }
  }

  const filteredPolicies = React.useMemo(() => {
    if (!searchQuery.trim()) return policies
    const q = searchQuery.toLowerCase().trim()
    return policies.filter(
      p =>
        p.key.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.legalReference?.toLowerCase().includes(q)
    )
  }, [policies, searchQuery])

  const totalCount = policies.length
  const activeCount = policies.filter(p => p.status === 'active').length
  const inactiveCount = totalCount - activeCount

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Đang tải danh sách chính sách vận hành…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alert Notifications */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-danger/30 bg-danger/10 text-danger text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Đã xảy ra sự cố</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => void reloadPolicies()}
            className="flex items-center gap-1 text-xs underline font-semibold hover:opacity-80"
          >
            <RefreshCw className="h-3 w-3" /> Tải lại
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-4 rounded-xl border border-success/30 bg-success/10 text-success text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="font-medium text-xs">{successMessage}</p>
        </div>
      )}

      {/* ═══ METRICS SUMMARY ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary-soft text-primary">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted block">Tổng số chính sách</span>
            <span className="text-xl font-bold text-fg block">
              {totalCount}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-success/10 text-success">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted block">
              Đang áp dụng (Active)
            </span>
            <span className="text-xl font-bold text-fg block">
              {activeCount}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-surface-muted text-muted">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted block">
              Tạm ngưng (Inactive)
            </span>
            <span className="text-xl font-bold text-fg block">
              {inactiveCount}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ POLICIES TABLE CARD ═══ */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-fg">
              Bảng tham số chính sách vận hành
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Các chính sách được tham chiếu trong hợp đồng và quy định dịch vụ
              công.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm theo khóa hoặc mô tả..."
                className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-border bg-bg text-fg focus:outline-hidden focus:border-primary"
              />
            </div>
            <button
              onClick={() => void reloadPolicies()}
              className="p-2 rounded-xl border border-border hover:bg-surface-muted text-muted hover:text-fg transition-colors"
              aria-label="Tải lại danh sách"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Mã chính sách</th>
                <th className="py-3 px-4">Mô tả & Căn cứ</th>
                <th className="py-3 px-4">Giá trị hiện tại</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPolicies.map(item => {
                const isEditing = editingKey === item.key
                const isSaving = savingKey === item.key
                return (
                  <tr
                    key={item.key}
                    className="hover:bg-surface-muted/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-fg align-top">
                      {item.key}
                    </td>
                    <td className="py-3.5 px-4 align-top space-y-1 max-w-xs">
                      <p className="font-medium text-fg">{item.description}</p>
                      {item.legalReference && (
                        <p className="text-[11px] text-muted italic">
                          Căn cứ: {item.legalReference}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="h-8 w-28 px-2 text-xs rounded-lg border border-primary bg-bg text-fg focus:outline-hidden font-semibold"
                          />
                          {item.unit && (
                            <span className="text-muted text-xs">
                              {item.unit}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => void handleSaveValue(item.key)}
                            disabled={isSaving}
                            aria-label="Lưu giá trị"
                            className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
                          >
                            {isSaving ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Save className="h-3 w-3" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            aria-label="Hủy chỉnh sửa"
                            className="p-1.5 rounded-lg border border-border text-muted hover:text-fg transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-fg text-sm">
                            {item.value} {item.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            aria-label={`Sửa giá trị ${item.key}`}
                            className="p-1 text-muted hover:text-primary transition-colors"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'active'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-surface-muted text-muted border border-border'
                        }`}
                      >
                        {item.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right align-top">
                      <button
                        type="button"
                        onClick={() => void handleToggleStatus(item)}
                        disabled={isSaving}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          item.status === 'active'
                            ? 'border-border text-muted hover:text-danger hover:border-danger/40'
                            : 'border-primary/40 text-primary hover:bg-primary-soft'
                        } disabled:opacity-40`}
                      >
                        {item.status === 'active' ? 'Tạm ngưng' : 'Kích hoạt'}
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filteredPolicies.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-muted text-xs italic"
                  >
                    Không tìm thấy chính sách phù hợp với từ khóa tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
