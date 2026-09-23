'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Calculator, Loader2, Save } from 'lucide-react'
import {
  calculateLivingCost,
  CalculationResult,
  saveLivingCostProfile,
} from '../api/living-cost-api'
import { CostBreakdownCard } from './cost-breakdown-card'
import { appToast } from '@/shared/ui/app-toast'

interface CostCalculatorModalProps {
  apartmentId?: string
  initialRent?: number
  trigger?: React.ReactNode
  onSaved?: () => void
}

export const CostCalculatorModal: React.FC<CostCalculatorModalProps> = ({
  apartmentId,
  initialRent = 10000000,
  trigger,
  onSaved,
}) => {
  const [open, setOpen] = useState(false)
  const [rent, setRent] = useState(initialRent)
  const [occupants, setOccupants] = useState(2)
  const [serviceFee, setServiceFee] = useState(500000)
  const [parkingFee, setParkingFee] = useState(150000)
  const [internetFee, setInternetFee] = useState(220000)
  const [budget, setBudget] = useState<number | undefined>(undefined)
  const [profileName, setProfileName] = useState('')

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const getPayload = (): Parameters<typeof calculateLivingCost>[0] => {
    const payload: Parameters<typeof calculateLivingCost>[0] = {
      monthlyRent: rent,
      occupants,
      serviceFee,
      parkingFee,
      internetFee,
    }
    if (apartmentId) payload.apartmentId = apartmentId
    if (budget !== undefined) payload.monthlyBudget = budget
    return payload
  }

  const handleCalculate = async () => {
    try {
      setLoading(true)
      const res = await calculateLivingCost(getPayload())
      setResult(res)
      appToast.success('Đã tính xong tổng chi phí sinh hoạt')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể tính chi phí'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (): Promise<void> => {
    if (!profileName.trim()) {
      appToast.error('Vui lÃ²ng Ä‘áº·t tÃªn cho há»“ sÆ¡ chi phÃ­')
      return
    }
    try {
      setSaving(true)
      await saveLivingCostProfile({ ...getPayload(), name: profileName.trim() })
      setProfileName('')
      onSaved?.()
      appToast.success('ÄÃ£ lÆ°u há»“ sÆ¡ chi phÃ­')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error
          ? error.message
          : 'KhÃ´ng thá»ƒ lÆ°u há»“ sÆ¡ chi phÃ­'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-border text-primary hover:bg-primary-soft"
          >
            <Calculator className="w-4 h-4 text-primary" />
            <span>Tính chi phí sinh hoạt</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-fg">
            <Calculator className="w-5 h-5 text-primary" />
            Công cụ tính tổng chi phí sinh hoạt
          </DialogTitle>
          <DialogDescription>
            Ước tính toàn bộ điện, nước, dịch vụ và phí cố định hàng tháng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">
                Giá thuê (VND/tháng)
              </label>
              <Input
                type="number"
                value={rent}
                onChange={e => setRent(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">Số người ở</label>
              <Input
                type="number"
                min={1}
                max={10}
                value={occupants}
                onChange={e => setOccupants(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">Phí dịch vụ</label>
              <Input
                type="number"
                value={serviceFee}
                onChange={e => setServiceFee(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">Phí gửi xe</label>
              <Input
                type="number"
                value={parkingFee}
                onChange={e => setParkingFee(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">Internet</label>
              <Input
                type="number"
                value={internetFee}
                onChange={e => setInternetFee(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-fg">
              Ngân sách tối đa của bạn (không bắt buộc)
            </label>
            <Input
              type="number"
              placeholder="Nhập ngân sách dự kiến..."
              value={budget ?? ''}
              onChange={e =>
                setBudget(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>

          <Button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full gap-2 bg-primary hover:bg-primary-hover text-surface"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Calculator className="w-4 h-4" />
            )}
            Tính toán ngay
          </Button>

          {result && (
            <>
              <CostBreakdownCard result={result} />
              {onSaved ? (
                <div className="space-y-2 rounded-xl border border-border bg-surface-muted p-3">
                  <label className="text-xs font-medium text-fg">
                    LÆ°u há»“ sÆ¡ chi phÃ­
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={profileName}
                      onChange={event => setProfileName(event.target.value)}
                      placeholder="VÃ­ dá»¥: NgÃ´i nhÃ  gáº§n cÃ´ng ty"
                      aria-label="TÃªn há»“ sÆ¡ chi phÃ­"
                    />
                    <Button
                      variant="outline"
                      onClick={() => void handleSave()}
                      disabled={saving}
                      className="shrink-0 gap-1.5"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      LÆ°u
                    </Button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
