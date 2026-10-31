'use client'

import * as React from 'react'
import {
  CalendarCheck2,
  Clock,
  ShieldCheck,
  Building2,
  BarChart2,
  ChevronDown,
  TrendingUp,
  HelpCircle,
  RefreshCw,
  Activity,
  Cpu,
  Layers,
  AlertCircle,
} from 'lucide-react'
import { FilterDropdown } from '@/shared/ui/filter-dropdown'
import { DateRangePicker } from '@/shared/ui/date-range-picker'
import type { DateRange } from '@/shared/ui/date-range-picker'
import { BookingBarChart } from './components/booking-bar-chart'
import { BookingStatusDoughnut } from './components/booking-status-doughnut'
import { BookingTrendLineChart } from './components/booking-trend-line-chart'
import { apiClient } from '@/shared/api/api-client'
import { AdminCard } from '@/shared/ui/admin-card'
import { computeConfirmationRate } from './lib/confirmation-rate'

// ─── Backend types ─────────────────────────────────────────────────────────────

interface OperationsStats {
  bookings: {
    total: number
    pending: number
    confirmed: number
    cancelled: number
    completed: number
  }
  kyc: { total: number; pending: number; verified: number; rejected: number }
  apartments: {
    total: number
    pending: number
    available: number
    rejected: number
  }
  tickets: { total: number; open: number; inProgress: number; resolved: number }
}

interface ChartPoint {
  label: string
  date: string
  bookings: number
  confirmed: number
  pending: number
  cancelled: number
}
interface StatusBreakdown {
  status: string
  label: string
  count: number
  color: string
}
interface OperationsChartData {
  trend: ChartPoint[]
  statusBreakdown: StatusBreakdown[]
}

// ─── Filter options ─────────────────────────────────────────────────────────────

const TIME_RANGE_OPTIONS = [
  { value: '7', label: '7 ngày qua' },
  { value: '14', label: '14 ngày qua' },
  { value: '30', label: '30 ngày qua' },
  { value: '90', label: '3 tháng qua' },
]

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string
  value: React.ReactNode
  subtext: string
  icon: React.ReactNode
  trend?: { value: string; type: 'up' | 'down' | 'neutral' } | undefined
  color?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
}

function StatCard({
  title,
  value,
  subtext,
  icon,
  trend,
  color = 'primary',
}: StatCardProps): React.ReactElement {
  const colorMap = {
    primary: { bg: 'bg-primary-soft', text: 'text-primary' },
    success: { bg: 'bg-success/10', text: 'text-success' },
    warning: { bg: 'bg-warning/10', text: 'text-warning' },
    danger: { bg: 'bg-danger/10', text: 'text-danger' },
    info: { bg: 'bg-info-soft', text: 'text-info' },
  }
  const c = colorMap[color]
  return (
    <AdminCard className="p-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold text-muted tracking-widest uppercase font-body leading-tight">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${c.bg} ${c.text} shrink-0`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-fg font-display">{value}</span>
        {trend && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              trend.type === 'up'
                ? 'bg-success/10 text-success'
                : trend.type === 'down'
                  ? 'bg-danger/10 text-danger'
                  : 'bg-surface-muted text-muted'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted font-body leading-relaxed">
        {subtext}
      </p>
    </AdminCard>
  )
}

function Skeleton(): React.ReactElement {
  return <div className="h-7 w-16 bg-surface-muted rounded animate-pulse" />
}

// ─── Blockchain welcome banner ─────────────────────────────────────────────────

function BlockchainBanner(): React.ReactElement {
  return (
    <AdminCard className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
      <div className="flex items-center gap-4 relative z-10">
        {/* Blockchain sticker */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 64 64"
          fill="none"
          className="shrink-0 drop-shadow-[0_4px_10px_rgba(198,90,58,0.12)]"
        >
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="14"
            fill="#ffffff"
            stroke="var(--primary)"
            strokeWidth="2"
          />
          <circle cx="32" cy="32" r="8" fill="var(--primary)" opacity="0.15" />
          <circle cx="32" cy="32" r="4" fill="var(--primary)" />
          <circle cx="16" cy="20" r="3" fill="var(--primary)" opacity="0.7" />
          <circle cx="48" cy="20" r="3" fill="var(--primary)" opacity="0.7" />
          <circle cx="16" cy="44" r="3" fill="var(--primary)" opacity="0.7" />
          <circle cx="48" cy="44" r="3" fill="var(--primary)" opacity="0.7" />
          <line
            x1="19"
            y1="20"
            x2="28"
            y2="28"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <line
            x1="45"
            y1="20"
            x2="36"
            y2="28"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <line
            x1="19"
            y1="44"
            x2="28"
            y2="36"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <line
            x1="45"
            y1="44"
            x2="36"
            y2="36"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>
        <div>
          <h2 className="text-base font-bold text-fg font-marketing">
            Tổng quan vận hành
          </h2>
          <p className="text-xs text-muted font-body mt-0.5">
            Hệ thống thuê căn hộ tích hợp Blockchain · Smart Contract · eKYC
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 relative z-10">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary-soft border border-primary/20 px-3 py-1.5 rounded-full">
          <Cpu className="h-3 w-3" /> Lưu vết chống sửa đổi
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-success bg-success/10 border border-success/20 px-3 py-1.5 rounded-full">
          <Layers className="h-3 w-3" /> Hợp đồng điện tử
        </span>
      </div>
      {/* Decorative bg */}
      <div className="absolute right-0 top-0 w-48 h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <circle
            cx="150"
            cy="50"
            r="80"
            stroke="var(--primary)"
            strokeWidth="40"
          />
        </svg>
      </div>
    </AdminCard>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export function OverviewView(): React.ReactElement {
  // Filter state
  const [days, setDays] = React.useState('7')
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: null,
    to: null,
  })
  const [showCharts, setShowCharts] = React.useState(true)

  // Data state
  const [stats, setStats] = React.useState<OperationsStats | null>(null)
  const [chartData, setChartData] = React.useState<OperationsChartData | null>(
    null
  )
  const [loadingStats, setLoadingStats] = React.useState(true)
  const [loadingChart, setLoadingChart] = React.useState(true)
  const [statsError, setStatsError] = React.useState<string | null>(null)
  const [chartError, setChartError] = React.useState<string | null>(null)

  const fetchStats = React.useCallback((): void => {
    setLoadingStats(true)
    setStatsError(null)
    apiClient
      .get<OperationsStats>('/operations/stats')
      .then(data => setStats(data))
      .catch((err: unknown) => {
        setStatsError(
          err instanceof Error ? err.message : 'Không thể tải thống kê'
        )
      })
      .finally(() => setLoadingStats(false))
  }, [])

  const fetchChartData = React.useCallback((numDays: string): void => {
    setLoadingChart(true)
    setChartError(null)
    apiClient
      .get<OperationsChartData>(`/operations/chart-data?days=${numDays}`)
      .then(data => setChartData(data))
      .catch((err: unknown) => {
        setChartError(
          err instanceof Error ? err.message : 'Không thể tải biểu đồ'
        )
      })
      .finally(() => setLoadingChart(false))
  }, [])

  React.useEffect(() => {
    const timeoutId = window.setTimeout(fetchStats, 0)
    return () => window.clearTimeout(timeoutId)
  }, [fetchStats])

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => fetchChartData(days), 0)
    return () => window.clearTimeout(timeoutId)
  }, [fetchChartData, days])

  // Derived chart data
  const filteredTrend = React.useMemo((): ChartPoint[] => {
    if (!chartData?.trend) return []
    if (!dateRange.from && !dateRange.to) return chartData.trend
    return chartData.trend.filter(p => {
      const d = new Date(p.date)
      if (dateRange.from && d < dateRange.from) return false
      if (dateRange.to && d > dateRange.to) return false
      return true
    })
  }, [chartData, dateRange])

  const barChartData = React.useMemo(
    () =>
      filteredTrend.map(p => ({
        label: p.label,
        pending: p.pending,
        confirmed: p.confirmed,
        cancelled: p.cancelled,
      })),
    [filteredTrend]
  )
  const trendData = React.useMemo(
    () =>
      filteredTrend.map(p => ({
        label: p.label,
        bookings: p.bookings,
        approved: p.confirmed,
      })),
    [filteredTrend]
  )
  const doughnutData = React.useMemo(
    () =>
      (chartData?.statusBreakdown ?? []).map(s => ({
        label: s.label,
        value: s.count,
        color: s.color,
        softColor: s.color,
      })),
    [chartData]
  )

  const hasChartData = filteredTrend.some(p => p.bookings > 0)

  const confirmationResult = computeConfirmationRate(stats?.bookings)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ── Blockchain Banner ────────────────────────────────────────────── */}
      <BlockchainBanner />

      {/* ── Section 1: Vận hành thực tế (Backend API) ───────────────────── */}
      <div className="space-y-4">
        {/* Sub-header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-fg font-marketing">
              Số liệu vận hành thực
            </h3>
            {(loadingStats || loadingChart) && (
              <span className="inline-block h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                fetchStats()
                fetchChartData(days)
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold border border-border rounded-lg text-muted hover:text-fg hover:border-border-strong transition-colors bg-surface cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Làm mới
            </button>
            <button
              type="button"
              aria-expanded={showCharts}
              onClick={() => setShowCharts(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all duration-200 cursor-pointer"
              style={
                showCharts
                  ? {
                      background: 'var(--primary)',
                      color: 'var(--on-control)',
                      borderColor: 'var(--primary)',
                    }
                  : {
                      background: 'var(--surface)',
                      color: 'var(--fg)',
                      borderColor: 'var(--border)',
                    }
              }
            >
              <BarChart2 className="h-3 w-3" />
              {showCharts ? 'Ẩn biểu đồ' : 'Hiện biểu đồ'}
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${showCharts ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {statsError && (
          <div className="flex items-center gap-2 text-xs text-danger bg-danger/5 border border-danger/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
            <span>{statsError}</span>
            <button
              type="button"
              onClick={fetchStats}
              className="ml-auto font-bold underline cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Filter bar */}
        <AdminCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
              Bộ lọc
            </span>
            {(days !== '7' || dateRange.from) && (
              <button
                type="button"
                onClick={() => {
                  setDays('7')
                  setDateRange({ from: null, to: null })
                }}
                className="ml-auto text-[10px] font-bold text-danger hover:underline"
              >
                Xoá bộ lọc
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <FilterDropdown
              id="overview-days"
              label="Khoảng thời gian"
              options={TIME_RANGE_OPTIONS}
              value={days}
              onChange={v => {
                setDays(v)
                setDateRange({ from: null, to: null })
              }}
            />
            <DateRangePicker
              id="overview-date-range"
              label="Ngày cụ thể"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </AdminCard>

        {/* Stats — row 1: Bookings */}
        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <CalendarCheck2 className="h-3 w-3" /> Lịch hẹn xem nhà
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              title="Tổng lịch hẹn"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.bookings.total ?? '—')
                )
              }
              subtext={
                statsError ? 'Không thể tải dữ liệu' : 'Tất cả trạng thái'
              }
              icon={<CalendarCheck2 className="h-4 w-4" />}
              color="primary"
            />
            <StatCard
              title="Chờ xác nhận"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.bookings.pending ?? '—')
                )
              }
              subtext={statsError ? 'Không thể tải dữ liệu' : 'Cần xử lý sớm'}
              icon={<Clock className="h-4 w-4" />}
              trend={
                stats && stats.bookings.pending > 5
                  ? { value: 'Cần xử lý', type: 'down' }
                  : undefined
              }
              color="warning"
            />
            <StatCard
              title="Đã xác nhận"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.bookings.confirmed ?? '—')
                )
              }
              subtext={statsError ? 'Không thể tải dữ liệu' : 'Đã được duyệt'}
              icon={<ShieldCheck className="h-4 w-4" />}
              color="success"
            />
            <StatCard
              title="Tỷ lệ đã xác nhận"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError || !stats ? (
                  '—'
                ) : (
                  confirmationResult.rateText
                )
              }
              subtext={
                statsError
                  ? 'Không thể tải dữ liệu'
                  : confirmationResult.subtext
              }
              icon={<TrendingUp className="h-4 w-4" />}
              trend={statsError ? undefined : confirmationResult.trend}
              color="info"
            />
          </div>
        </div>

        {/* Stats — row 2: KYC, Apartments, Tickets */}
        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Building2 className="h-3 w-3" /> Nghiệp vụ khác
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              title="KYC chờ duyệt"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.kyc.pending ?? '—')
                )
              }
              subtext={
                statsError
                  ? 'Không thể tải dữ liệu'
                  : `Tổng ${stats?.kyc.total ?? 0} hồ sơ`
              }
              icon={<ShieldCheck className="h-4 w-4" />}
              trend={
                stats
                  ? stats.kyc.pending > 0
                    ? { value: `${stats.kyc.pending} chờ`, type: 'down' }
                    : { value: 'Ổn định', type: 'up' }
                  : undefined
              }
              color="warning"
            />
            <StatCard
              title="Căn hộ chờ duyệt"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.apartments.pending ?? '—')
                )
              }
              subtext={
                statsError
                  ? 'Không thể tải dữ liệu'
                  : `${stats?.apartments.available ?? 0} đang cho thuê`
              }
              icon={<Building2 className="h-4 w-4" />}
              trend={
                stats
                  ? stats.apartments.pending > 0
                    ? { value: `${stats.apartments.pending} chờ`, type: 'down' }
                    : { value: 'Ổn định', type: 'up' }
                  : undefined
              }
              color="primary"
            />
            <StatCard
              title="Ticket hỗ trợ mở"
              value={
                loadingStats ? (
                  <Skeleton />
                ) : statsError ? (
                  '—'
                ) : (
                  (stats?.tickets.open ?? '—')
                )
              }
              subtext={
                statsError
                  ? 'Không thể tải dữ liệu'
                  : `${stats?.tickets.inProgress ?? 0} đang xử lý`
              }
              icon={<HelpCircle className="h-4 w-4" />}
              trend={
                stats
                  ? stats.tickets.open > 3
                    ? { value: 'Cần xử lý', type: 'down' }
                    : { value: 'Ổn định', type: 'up' }
                  : undefined
              }
              color={stats && stats.tickets.open > 3 ? 'danger' : 'success'}
            />
          </div>
        </div>

        {/* Booking charts (toggleable) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${showCharts ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          {chartError ? (
            <div className="flex items-center gap-2 text-xs text-danger bg-danger/5 border border-danger/20 rounded-lg px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
              <span>{chartError}</span>
              <button
                type="button"
                onClick={() => fetchChartData(days)}
                className="ml-auto font-bold underline cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          ) : !loadingChart && !hasChartData ? (
            <AdminCard className="text-xs text-muted px-4 py-6 text-center">
              Chưa có lịch hẹn trong khoảng thời gian này.
            </AdminCard>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 min-h-[240px]">
                  {loadingChart ? (
                    <AdminCard className="p-5 flex items-center justify-center min-h-[240px]">
                      <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </AdminCard>
                  ) : (
                    <BookingBarChart
                      data={barChartData}
                      title="Lịch hẹn theo ngày"
                    />
                  )}
                </div>
                <div className="min-h-[240px]">
                  {loadingChart ? (
                    <AdminCard className="p-5 flex items-center justify-center min-h-[240px]">
                      <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </AdminCard>
                  ) : (
                    <BookingStatusDoughnut
                      data={doughnutData}
                      title="Tỷ lệ trạng thái"
                    />
                  )}
                </div>
              </div>
              <div className="min-h-[220px]">
                {loadingChart ? (
                  <AdminCard className="p-5 flex items-center justify-center min-h-[220px]">
                    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </AdminCard>
                ) : (
                  <BookingTrendLineChart
                    data={trendData}
                    title="Xu hướng lịch hẹn theo thời gian"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
