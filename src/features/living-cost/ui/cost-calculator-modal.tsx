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
import { Calculator, Loader2 } from 'lucide-react'
import { calculateLivingCost, CalculationResult } from '../api/living-cost-api'
import { CostBreakdownCard } from './cost-breakdown-card'
import { appToast } from '@/shared/ui/app-toast'

interface CostCalculatorModalProps {
  apartmentId?: string
  initialRent?: number
  trigger?: React.ReactNode
}

export const CostCalculatorModal: React.FC<CostCalculatorModalProps> = ({
  apartmentId,
  initialRent = 10000000,
  trigger,
}) => {
  const [open, setOpen] = useState(false)
  const [rent, setRent] = useState(initialRent)
  const [occupants, setOccupants] = useState(2)
  const [serviceFee, setServiceFee] = useState(500000)
  const [parkingFee, setParkingFee] = useState(150000)
  const [internetFee, setInternetFee] = useState(220000)
  const [budget, setBudget] = useState<number | undefined>(undefined)

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    try {
      setLoading(true)
      const payload: Parameters<typeof calculateLivingCost>[0] = {
        monthlyRent: rent,
        occupants,
        serviceFee,
        parkingFee,
        internetFee,
      }
      if (apartmentId) payload.apartmentId = apartmentId
      if (budget !== undefined) payload.monthlyBudget = budget

      const res = await calculateLivingCost(payload)
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

          {result && <CostBreakdownCard result={result} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
