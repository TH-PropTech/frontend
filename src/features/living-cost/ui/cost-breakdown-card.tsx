'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Zap,
  Droplets,
  Wifi,
  Car,
  Home,
} from 'lucide-react'
import type { CalculationResult } from '../api/living-cost-api'

interface CostBreakdownCardProps {
  result: CalculationResult
}

export const CostBreakdownCard: React.FC<CostBreakdownCardProps> = ({
  result,
}) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const renderAffordabilityBadge = () => {
    switch (result.affordabilityStatus) {
      case 'affordable':
        return (
          <Badge
            variant="outline"
            style={{
              borderColor: 'var(--success)',
              color: 'var(--success)',
              backgroundColor: 'var(--success-soft)',
            }}
            className="gap-1 font-semibold"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Trong ngân sách tốt
          </Badge>
        )
      case 'tight':
        return (
          <Badge
            variant="outline"
            style={{
              borderColor: 'var(--warning)',
              color: 'var(--warning)',
              backgroundColor: 'var(--warning-soft)',
            }}
            className="gap-1 font-semibold"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Vừa đủ ngân sách
          </Badge>
        )
      case 'over_budget':
        return (
          <Badge
            variant="outline"
            style={{
              borderColor: 'var(--danger)',
              color: 'var(--danger)',
              backgroundColor: 'var(--danger-soft)',
            }}
            className="gap-1 font-semibold"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Vượt ngân sách dự kiến
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      className="shadow-sm border"
    >
      <CardHeader
        className="py-3 px-4 pb-2 border-b flex flex-row items-center justify-between"
        style={{ borderColor: 'var(--border)' }}
      >
        <CardTitle
          className="text-sm font-semibold flex items-center gap-2"
          style={{ color: 'var(--fg)' }}
        >
          <Calculator className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          <span>Tổng chi phí sinh hoạt dự kiến</span>
        </CardTitle>
        {renderAffordabilityBadge()}
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Total Summary */}
        <div
          className="p-3 rounded-lg border flex items-center justify-between"
          style={{
            backgroundColor: 'var(--primary-soft)',
            borderColor: 'var(--primary-soft)',
          }}
        >
          <div>
            <span
              className="text-xs block font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Ước tính hàng tháng
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {formatVND(result.totalEstimate.mid)}
            </span>
          </div>
          <div className="text-right text-xs" style={{ color: 'var(--muted)' }}>
            <span>Khoảng dao động</span>
            <span
              className="block font-semibold"
              style={{ color: 'var(--fg)' }}
            >
              {formatVND(result.totalEstimate.low)} -{' '}
              {formatVND(result.totalEstimate.high)}
            </span>
          </div>
        </div>

        {/* Detailed Items */}
        <div className="space-y-2 text-xs">
          <div
            className="flex items-center justify-between py-1 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="flex items-center gap-1.5"
              style={{ color: 'var(--muted)' }}
            >
              <Home
                className="w-3.5 h-3.5"
                style={{ color: 'var(--subtle)' }}
              />
              Tiền thuê nhà cố định
            </span>
            <span className="font-semibold" style={{ color: 'var(--fg)' }}>
              {formatVND(result.monthlyRent)}
            </span>
          </div>

          <div
            className="flex items-center justify-between py-1 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="flex items-center gap-1.5"
              style={{ color: 'var(--muted)' }}
            >
              <Zap
                className="w-3.5 h-3.5"
                style={{ color: 'var(--primary)' }}
              />
              Tiền điện ước tính ({result.occupants} người)
            </span>
            <span className="font-semibold" style={{ color: 'var(--fg)' }}>
              ~{formatVND(result.electricityEstimate.mid)}
            </span>
          </div>

          <div
            className="flex items-center justify-between py-1 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="flex items-center gap-1.5"
              style={{ color: 'var(--muted)' }}
            >
              <Droplets
                className="w-3.5 h-3.5"
                style={{ color: 'var(--primary)' }}
              />
              Tiền nước ước tính
            </span>
            <span className="font-semibold" style={{ color: 'var(--fg)' }}>
              ~{formatVND(result.waterEstimate.mid)}
            </span>
          </div>

          {result.serviceFee > 0 && (
            <div
              className="flex items-center justify-between py-1 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span style={{ color: 'var(--muted)' }}>
                Phí dịch vụ chung cư
              </span>
              <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                {formatVND(result.serviceFee)}
              </span>
            </div>
          )}

          {result.parkingFee > 0 && (
            <div
              className="flex items-center justify-between py-1 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="flex items-center gap-1.5"
                style={{ color: 'var(--muted)' }}
              >
                <Car
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--subtle)' }}
                />
                Phí gửi xe
              </span>
              <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                {formatVND(result.parkingFee)}
              </span>
            </div>
          )}

          {result.internetFee > 0 && (
            <div
              className="flex items-center justify-between py-1 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="flex items-center gap-1.5"
                style={{ color: 'var(--muted)' }}
              >
                <Wifi
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--subtle)' }}
                />
                Internet / Truyền hình
              </span>
              <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                {formatVND(result.internetFee)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
