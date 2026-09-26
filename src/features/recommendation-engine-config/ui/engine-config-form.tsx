'use client'

import * as React from 'react'
import {
  Cpu,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Layers,
  Activity,
  Info,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Slider } from '@/shared/ui/slider'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { useEngineConfig, DEFAULT_CONFIG } from '../model/use-engine-config'
import { STRATEGY_DEFINITIONS } from '../model/types'
import type { EngineStrategy } from '../model/types'

export function EngineConfigForm(): React.ReactElement {
  const {
    config,
    isLoading,
    isSaving,
    error,
    successMessage,
    updateConfig,
    resetToDefault,
    clearMessages,
  } = useEngineConfig()

  const [draft, setDraft] = React.useState<{
    strategy: EngineStrategy
    alpha: number
    nbWeight: number
    ruleWeight: number
  } | null>(null)
  const formValues =
    draft ??
    (config
      ? {
          strategy: config.strategy,
          alpha: config.alpha,
          nbWeight: config.nbWeight,
          ruleWeight: config.ruleWeight,
        }
      : DEFAULT_CONFIG)
  const selectedStrategy = formValues.strategy
  const alpha = formValues.alpha
  const nbWeight = formValues.nbWeight

  const updateDraft = (changes: Partial<typeof DEFAULT_CONFIG>): void => {
    setDraft(current => ({ ...(current ?? formValues), ...changes }))
  }

  const ruleWeight = Math.round((1.0 - nbWeight) * 100) / 100

  const handleStrategyChange = (newStrategy: EngineStrategy): void => {
    updateDraft({ strategy: newStrategy })
    clearMessages()
  }

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = parseFloat(e.target.value)
    if (!Number.isNaN(val) && val >= 0.1) {
      updateDraft({ alpha: Math.round(val * 10) / 10 })
    } else if (e.target.value === '') {
      updateDraft({ alpha: 0.1 })
    }
    clearMessages()
  }

  const handleSliderChange = (vals: number[]): void => {
    const firstValue = vals[0]
    if (firstValue !== undefined) {
      updateDraft({ nbWeight: Math.round(firstValue * 100) / 100 })
      clearMessages()
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await updateConfig({ ...formValues, ruleWeight })
  }

  const handleReset = async (): Promise<void> => {
    setDraft(DEFAULT_CONFIG)
    await resetToDefault()
  }

  const activeStrategyDef = STRATEGY_DEFINITIONS.find(
    s => s.id === (config?.strategy ?? 'hybrid')
  )

  if (isLoading && !config) {
    return (
      <Card className="p-10 flex flex-col items-center justify-center text-center space-y-3">
        <Cpu className="w-8 h-8 text-primary animate-pulse" />
        <p className="text-sm font-medium text-muted">
          Đang tải cấu hình AI Recommendation Engine...
        </p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ═══ LIVE STATUS BAR ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary-soft text-primary">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Trạng thái hoạt động
                </span>
                <Badge
                  variant="outline"
                  className="text-success border-success/30 bg-success/10 gap-1.5 py-0 px-2 text-[11px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Active
                </Badge>
              </div>
              <p className="text-sm font-bold text-fg mt-0.5">
                Chiến lược đang chạy:{' '}
                <span className="text-primary font-medium">
                  {activeStrategyDef?.name ?? 'Hybrid NB + Rule-based'}
                </span>
              </p>
            </div>
          </div>

          {config?.updatedAt && (
            <div className="text-xs text-muted sm:text-right">
              <span>Cập nhật lần cuối: </span>
              <span className="font-medium text-fg">
                {new Date(config.updatedAt).toLocaleString('vi-VN')}
              </span>
              {config.updatedBy && (
                <span className="block text-muted text-[11px] mt-0.5">
                  Bởi: {config.updatedBy}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ═══ ALERTS ═══ */}
      {error && (
        <Alert
          variant="destructive"
          className="bg-danger/10 border-danger/30 text-danger"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="bg-success/10 border-success/30 text-success">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* ═══ SECTION 1: STRATEGY SELECTOR ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm sm:text-base font-bold text-fg">
              Chọn Chiến Lược Học Máy (Strategy Selection)
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted leading-relaxed">
            Hệ thống hỗ trợ 4 biến thể thuật toán gợi ý căn hộ. Khi thay đổi
            chiến lược, hệ thống sẽ tự động retrain mô hình và áp dụng ngay lập
            tức cho toàn bộ người dùng.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STRATEGY_DEFINITIONS.map(strategy => {
              const isSelected = selectedStrategy === strategy.id
              return (
                <div
                  key={strategy.id}
                  onClick={() => handleStrategyChange(strategy.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary-soft/40 shadow-xs ring-1 ring-primary'
                      : 'border-border bg-surface hover:border-border-strong hover:bg-surface-muted/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          id={`strategy-${strategy.id}`}
                          name="engine-strategy"
                          value={strategy.id}
                          checked={isSelected}
                          onChange={() => handleStrategyChange(strategy.id)}
                          className="text-primary focus:ring-primary h-4 w-4 border-border cursor-pointer accent-primary"
                        />
                        <label
                          htmlFor={`strategy-${strategy.id}`}
                          className="text-sm font-semibold text-fg cursor-pointer"
                        >
                          {strategy.name}
                        </label>
                      </div>
                      <Badge
                        variant={isSelected ? 'default' : 'secondary'}
                        className="text-[10px] uppercase font-bold shrink-0 tracking-wider"
                      >
                        {strategy.badge}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted mt-2 leading-relaxed pl-6.5">
                      {strategy.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-border/60 flex items-start gap-1.5 text-[11px] text-muted pl-6.5">
                    <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{strategy.details}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ═══ SECTION 2: HYPERPARAMETER TUNING ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm sm:text-base font-bold text-fg">
              Tinh Chỉnh Siêu Tham Số (Hyperparameters)
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted leading-relaxed">
            Điều chỉnh trọng số tiên nghiệm và tỷ lệ kết hợp giữa học máy thống
            kê và quy tắc nghiệp vụ.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Alpha parameter */}
            <div className="p-4 bg-surface-muted/30 border border-border rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="param-alpha"
                  className="text-xs font-semibold text-fg"
                >
                  Dirichlet Prior Alpha (α)
                </label>
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-primary border-primary/30 bg-primary-soft/30"
                >
                  {alpha.toFixed(1)}
                </Badge>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                Hệ số làm mịn Dirichlet prior cho MAP Bayesian. Khi α = 1.0
                tương đương phép làm mịn Laplace chuẩn.
              </p>
              <div className="pt-1">
                <input
                  id="param-alpha"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={alpha}
                  onChange={handleAlphaChange}
                  className="w-full h-9 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-fg font-mono outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary-soft hover:border-border-strong"
                />
              </div>
            </div>

            {/* Weights ratio */}
            <div className="p-4 bg-surface-muted/30 border border-border rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="param-nb-weight"
                  className="text-xs font-semibold text-fg"
                >
                  Tỷ lệ trọng số NB vs Rule-based
                </label>
                <span className="text-xs font-mono font-medium text-fg">
                  <span className="text-primary">
                    {Math.round(nbWeight * 100)}% NB
                  </span>{' '}
                  /{' '}
                  <span className="text-accent">
                    {Math.round(ruleWeight * 100)}% Rule
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                Cân bằng giữa xác suất thống kê Naive Bayes và bộ 4 trụ cột quy
                tắc nghiệp vụ (Tài chính, Vị trí, Nhân khẩu học, Tiện ích).
              </p>
              <div className="pt-2 space-y-2">
                <Slider
                  id="param-nb-weight"
                  value={[nbWeight]}
                  onValueChange={handleSliderChange}
                  min={0}
                  max={1}
                  step={0.05}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-muted font-mono">
                  <span>0% NB (100% Rule)</span>
                  <span>50 / 50</span>
                  <span>100% NB (0% Rule)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══ ACTIONS ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Khôi phục mặc định (Hybrid 50/50)
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={isSaving}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          <Save className="w-3.5 h-3.5" />
          Lưu & Áp dụng Chiến Lược
        </Button>
      </div>
    </form>
  )
}
