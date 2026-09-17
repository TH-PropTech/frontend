'use client'

import * as React from 'react'
import {
  ShieldAlert,
  FileCheck2,
  FileClock,
  Lock,
  X,
  RefreshCw,
} from 'lucide-react'
import {
  getContractImpactReport,
  type ContractImpactReport,
} from '../api/rental-flow-api'

interface ImpactAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImpactAnalysisModal({
  isOpen,
  onClose,
}: ImpactAnalysisModalProps): React.ReactElement | null {
  const [report, setReport] = React.useState<ContractImpactReport | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchReport = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getContractImpactReport()
      setReport(data)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải báo cáo phân tích tác động hợp đồng'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!isOpen) return
    let isMounted = true
    getContractImpactReport()
      .then(data => {
        if (isMounted) {
          setReport(data)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải báo cáo phân tích tác động hợp đồng'
          )
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fg/40 backdrop-blur-xs">
      <div className="bg-surface border border-border w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-fg">
                Phân tích tác động hợp đồng (Contract Impact Analysis)
              </h3>
              <p className="text-[11px] text-muted">
                Đánh giá phạm vi ảnh hưởng của việc kích hoạt quy trình thuê mới
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-fg hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-10 gap-2 text-muted text-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              Đang phân loại trạng thái hợp đồng trong hệ thống...
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger">
              {error}
            </div>
          )}

          {!loading && report && (
            <div className="space-y-4">
              <div className="p-3 bg-surface-muted rounded-xl border border-border text-xs text-fg flex items-center justify-between">
                <span className="font-semibold">
                  Tổng số hợp đồng được quét:
                </span>
                <span className="font-bold text-primary text-sm">
                  {report.totalContractsEvaluated}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* 1. Unsigned Drafts */}
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-fg">
                        Hợp đồng nháp chưa ký (Eligible Unsigned Drafts)
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600">
                        {report.eligibleUnsignedDrafts}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted mt-1">
                      Được đánh dấu CONFIG_OUTDATED nếu cấu hình thay đổi và cho
                      phép đồng bộ tự động sang phiên bản quy trình mới mà không
                      ảnh hưởng quyền lợi pháp lý.
                    </p>
                  </div>
                </div>

                {/* 2. Partially Signed */}
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <FileClock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-fg">
                        Hợp đồng đã ký 1 bên (Partially Signed)
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600">
                        {report.partiallySigned}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted mt-1">
                      Bảo lưu cấu hình lúc khởi tạo để bảo toàn tính hợp lệ của
                      chữ ký đã có. Nghiêm cấm ghi đè cấu hình để tránh vi phạm
                      Điều 401 Bộ luật Dân sự 2015.
                    </p>
                  </div>
                </div>

                {/* 3. Immutable Signed */}
                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-fg">
                        Hợp đồng hiệu lực / Đã hoàn tất (Immutable Signed)
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600">
                        {report.immutableSigned}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted mt-1">
                      Bất biến tuyệt đối. Mã băm hợp đồng và điều khoản đã được
                      đóng băng và neo trên sổ cái Hyperledger Fabric. Cấu hình
                      mới hoàn toàn không ảnh hưởng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-muted flex items-center justify-between">
          <button
            type="button"
            onClick={fetchReport}
            disabled={loading}
            className="text-xs text-muted hover:text-fg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
            />
            Làm mới phân tích
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  )
}
