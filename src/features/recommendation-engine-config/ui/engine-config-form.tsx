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
  Scale,
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
import {
  STRATEGY_EXPLAINERS,
  RULE_SCORE_EXPLAINER,
} from '../model/strategy-explainers'
import { StrategyExplainerDialog } from './strategy-explainer-dialog'
import { NaiveBayesIntro } from './naive-bayes-intro'

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
          Đang tải cấu hình gợi ý căn hộ...
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
                  Đang hoạt động
                </span>
                <Badge
                  variant="outline"
                  className="text-success border-success/30 bg-success/10 gap-1.5 py-0 px-2 text-[11px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Bật
                </Badge>
              </div>
              <p className="text-sm font-bold text-fg mt-0.5">
                Cách gợi ý đang dùng:{' '}
                <span className="text-primary font-medium">
                  {activeStrategyDef?.name ?? 'Cân bằng'}
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

      {/* ═══ SECTION 0: NAIVE BAYES INTRO ═══ */}
      <NaiveBayesIntro />

      {/* ═══ SECTION 1: STRATEGY SELECTOR ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm sm:text-base font-bold text-fg">
              Chọn cách hệ thống gợi ý căn hộ
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted leading-relaxed">
            Có 4 cách tính. Khi bạn đổi, hệ thống tự học lại từ dữ liệu thuê và
            áp dụng ngay cho mọi người dùng. Không chắc thì giữ &quot;Cân
            bằng&quot;. Bấm nút ⓘ để xem giải thích chi tiết.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STRATEGY_DEFINITIONS.map(strategy => {
              const isSelected = selectedStrategy === strategy.id
              return (
                <div
                  key={strategy.id}
                  onClick={e => {
                    // Click trong hộp thoại "i" (render qua portal) vẫn nổi bọt qua cây React — bỏ qua.
                    if (!e.currentTarget.contains(e.target as Node)) return
                    handleStrategyChange(strategy.id)
                  }}
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
                          <span className="block text-[10px] font-normal text-muted">
                            {strategy.technicalName}
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge
                          variant={isSelected ? 'default' : 'secondary'}
                          className="text-[10px] uppercase font-bold shrink-0 tracking-wider"
                        >
                          {strategy.badge}
                        </Badge>
                        <StrategyExplainerDialog
                          explainer={STRATEGY_EXPLAINERS[strategy.id]}
                          triggerLabel={`Giải thích cách gợi ý ${strategy.name}`}
                        />
                      </div>
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

      {/* ═══ SECTION 1b: RULE SCORE ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardContent className="p-4 sm:p-5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-soft text-primary shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-fg">
                Bảng kiểm quy tắc (dùng cho cả 4 cách gợi ý)
              </p>
              <StrategyExplainerDialog
                explainer={RULE_SCORE_EXPLAINER}
                triggerLabel="Giải thích bảng kiểm quy tắc"
              />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Ngoài việc học từ dữ liệu thuê, mỗi căn còn được chấm theo bảng
              kiểm như một nhân viên tư vấn: giá có vừa túi tiền, đúng quận, đủ
              phòng, có tiện ích cần thiết, hợp độ tuổi. Hai phần điểm được trộn
              theo thanh trượt ở mục bên dưới.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ═══ SECTION 2: HYPERPARAMETER TUNING ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm sm:text-base font-bold text-fg">
              Tinh chỉnh nâng cao
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted leading-relaxed">
            Hai núm chỉnh ảnh hưởng đến cách chấm điểm. Không rành thì cứ để mặc
            định.
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
                  Mức thận trọng khi ít dữ liệu (α)
                </label>
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-primary border-primary/30 bg-primary-soft/30"
                >
                  {alpha.toFixed(1)}
                </Badge>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                Số lượt thuê &quot;ảo&quot; cộng thêm cho mọi lựa chọn, để hệ
                thống không kết luận vội khi một căn mới có vài lượt thuê. Số
                càng lớn càng thận trọng; 1,0 là mức chuẩn. Chỉ có tác dụng với
                2 cách &quot;Thận trọng khi ít dữ liệu&quot; và &quot;Nâng
                cao&quot;.
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
                  Tin dữ liệu hay tin quy tắc?
                </label>
                <span className="text-xs font-mono font-medium text-fg">
                  <span className="text-primary">
                    {Math.round(nbWeight * 100)}% dữ liệu
                  </span>{' '}
                  /{' '}
                  <span className="text-accent">
                    {Math.round(ruleWeight * 100)}% quy tắc
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                &quot;Dữ liệu&quot; là học từ những người đã thuê trước đây.
                &quot;Quy tắc&quot; là bảng kiểm nghiệp vụ (giá, khu vực, số
                phòng, tiện ích, độ tuổi). Kéo sang trái để tin quy tắc hơn,
                sang phải để tin dữ liệu hơn.
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
                  <span>Chỉ quy tắc</span>
                  <span>50 / 50</span>
                  <span>Chỉ dữ liệu</span>
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
          Về mặc định (Cân bằng 50/50)
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={isSaving}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          <Save className="w-3.5 h-3.5" />
          Lưu & áp dụng
        </Button>
      </div>
    </form>
  )
}
