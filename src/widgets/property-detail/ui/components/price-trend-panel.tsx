'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ApartmentItem } from '@/entities/properties'
import {
  apartmentChangePercent,
  buildPriceTrendModel,
  CHART,
  getApartmentInsights,
  type ApartmentInsights,
  type TrendLine,
} from '@/features/apartment-insights'

interface ExplainData {
  title: string
  description: string
  formula?: string
  visualExample?: string
  steps?: string[]
}

interface PriceTrendPanelProps {
  property: ApartmentItem
  onExplain: (data: ExplainData) => void
}

const LINE_STYLE: Record<
  TrendLine['key'],
  { stroke: string; width: number; dash?: string; label: string }
> = {
  apartment: { stroke: '#C65A3A', width: 3.5, label: 'Căn hộ này' },
  project: { stroke: '#F2B66D', width: 2.5, label: 'Dự án trung bình' },
  district: {
    stroke: '#A49389',
    width: 2,
    dash: '4 2',
    label: 'Khu vực lân cận',
  },
}

const SCORE_TONE = [
  { min: 70, text: 'text-success', label: 'Mức rất an toàn' },
  { min: 40, text: 'text-warning', label: 'Mức khá, cần xác minh thêm' },
  { min: 0, text: 'text-danger', label: 'Mức thấp, cần thận trọng' },
] as const

const vnd = (value: number): string => `${value.toLocaleString('vi-VN')} đ`

function InfoButton({
  title,
  onClick,
}: {
  title: string
  onClick: () => void
}): React.ReactElement {
  return (
    <button
      onClick={onClick}
      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
      title={title}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="12" cy="8.2" r="1.2" fill="currentColor" />
        <line
          x1="12"
          y1="11.5"
          x2="12"
          y2="16.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

function PanelNotice({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border bg-surface-muted/20 p-5 text-center text-sm font-medium text-muted-foreground">
      {children}
    </div>
  )
}

function PriceTrendChart({
  insights,
}: {
  insights: ApartmentInsights
}): React.ReactElement {
  const { priceTrend } = insights
  const model = buildPriceTrendModel(priceTrend)
  if (!model.hasData)
    return <PanelNotice>Chưa có dữ liệu giá thuê.</PanelNotice>

  return (
    <div className="relative border border-border rounded-2xl p-5 bg-surface-muted/20">
      <svg
        viewBox="0 0 400 220"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Biến động giá thuê 12 tháng"
      >
        {model.ticks.map(tick => (
          <g key={tick.label + tick.y}>
            <line
              x1={CHART.left}
              y1={tick.y}
              x2={CHART.right}
              y2={tick.y}
              stroke="#C9B8AE"
              strokeWidth="0.75"
              strokeDasharray="3"
            />
            <text
              x="5"
              y={tick.y + 4}
              fill="#4B3E36"
              className="font-mono text-[11px] font-bold"
            >
              {tick.label}
            </text>
          </g>
        ))}
        <line
          x1={CHART.left}
          y1={CHART.bottom}
          x2={CHART.right}
          y2={CHART.bottom}
          stroke="#8E7A6E"
          strokeWidth="1.25"
        />
        <line
          x1={CHART.left}
          y1={CHART.top}
          x2={CHART.left}
          y2={CHART.bottom}
          stroke="#8E7A6E"
          strokeWidth="1.25"
        />
        {model.monthLabels.map(month => (
          <text
            key={month.label + month.x}
            x={month.x}
            y="192"
            textAnchor="middle"
            fill="#4B3E36"
            className="font-body text-[11px] font-bold"
          >
            {month.label}
          </text>
        ))}
        {model.lines.map(line => {
          const style = LINE_STYLE[line.key]
          return (
            <g key={line.key}>
              {line.segments.map((segment, index) => (
                <polyline
                  key={index}
                  points={segment.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
              {line.key === 'apartment' && line.last && (
                <circle
                  cx={line.last.x}
                  cy={line.last.y}
                  r="5"
                  className="fill-primary stroke-white stroke-2"
                />
              )}
            </g>
          )
        })}
      </svg>

      <div className="flex justify-center gap-5 mt-4 flex-wrap border-t border-border/40 pt-3">
        {model.lines
          .slice()
          .reverse()
          .map(line => {
            const style = LINE_STYLE[line.key]
            return (
              <div key={line.key} className="flex items-center gap-2">
                <span
                  className="h-3 w-7 rounded block"
                  style={
                    line.key === 'district'
                      ? { border: `1px dashed ${style.stroke}` }
                      : { backgroundColor: style.stroke }
                  }
                />
                <span className="font-body text-xs text-fg font-bold">
                  {style.label}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function buildTrendExplain(
  property: ApartmentItem,
  insights: ApartmentInsights | undefined
): ExplainData {
  const change = insights ? apartmentChangePercent(insights.priceTrend) : null
  const trend = insights?.priceTrend
  return {
    title: 'Cách tính biến động giá thuê',
    description:
      'Mỗi lần chủ nhà đổi giá, hệ thống ghi lại mức giá và thời điểm. Biểu đồ lấy mức giá có hiệu lực cuối mỗi tháng, so với trung bình của các tin cùng dự án và cùng khu vực.',
    formula: 'P_tb(tháng) = (1 / N) * Tổng(P_i có hiệu lực cuối tháng)',
    visualExample: change
      ? `Căn này: ${vnd(change.from)} → ${vnd(change.to)}/tháng (${change.percent >= 0 ? '+' : ''}${change.percent.toFixed(1)}% trong kỳ có dữ liệu).`
      : `Căn này hiện có giá ${property.price}. Chưa có lần đổi giá nào nên đường giá đi ngang từ ngày đăng tin.`,
    steps: [
      'Lấy lịch sử giá của căn hộ, tính mức giá có hiệu lực cuối mỗi tháng.',
      trend?.projectName
        ? `Tính trung bình ${trend.projectSampleCount} tin trong dự án ${trend.projectName}.`
        : 'Tin chưa gắn dự án nên không có đường trung bình dự án.',
      trend?.districtName
        ? `Tính trung bình ${trend.districtSampleCount} tin tại ${trend.districtName}.`
        : 'Chưa xác định khu vực nên không có đường trung bình khu vực.',
    ],
  }
}

function buildTrustExplain(
  insights: ApartmentInsights | undefined
): ExplainData {
  const trust = insights?.trust
  return {
    title: 'Cách tính điểm tin cậy (Trust Score)',
    description:
      'Điểm tin cậy cộng từ các tiêu chí kiểm chứng được trong hệ thống: định danh chủ hộ, hồ sơ sở hữu, kiểm duyệt tin đăng, ghi nhận Blockchain và lịch sử hợp đồng của chủ hộ.',
    formula: 'Score = Tổng(điểm đạt của từng tiêu chí) / 100',
    visualExample: trust
      ? trust.items
          .map(item => `${item.label}: ${item.points}/${item.maxPoints}đ`)
          .join(' · ')
      : 'Đang tải dữ liệu chấm điểm.',
    steps: [
      'KYC chủ hộ đã xác minh: 30đ.',
      'Có số giấy chứng nhận quyền sở hữu: 20đ.',
      'Tin đăng đã được nhân viên kiểm duyệt: 15đ.',
      'Có hợp đồng ghi nhận thành công trên Blockchain: 15đ.',
      'Tỷ lệ hợp đồng thực hiện đầy đủ của chủ hộ: tối đa 20đ.',
    ],
  }
}

export function PriceTrendPanel({
  property,
  onExplain,
}: PriceTrendPanelProps): React.ReactElement {
  const insightsQuery = useQuery({
    queryKey: ['apartment-insights', property.id],
    queryFn: () => getApartmentInsights(property.id),
    enabled: Boolean(property.id),
  })
  const insights = insightsQuery.data
  const trust = insights?.trust
  const tone =
    SCORE_TONE.find(item => (trust?.score ?? 0) >= item.min) ?? SCORE_TONE[2]

  const failed = insightsQuery.isError
  const loading = insightsQuery.isLoading

  return (
    <div className="bg-white border border-border rounded-3xl p-4 md:p-5 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Biến động giá thuê 12 tháng qua
          </div>
          <InfoButton
            title="Xem giải thích thuật toán"
            onClick={() => onExplain(buildTrendExplain(property, insights))}
          />
        </h3>
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
          Lịch sử giá niêm yết của căn hộ so với trung bình các tin cùng dự án
          và khu vực.
          {insights?.priceTrend.projectName &&
            ` Dự án: ${insights.priceTrend.projectSampleCount} tin.`}
          {insights?.priceTrend.districtName &&
            ` ${insights.priceTrend.districtName}: ${insights.priceTrend.districtSampleCount} tin.`}
        </p>
        {loading && (
          <div className="h-64 animate-pulse rounded-2xl bg-surface-muted" />
        )}
        {failed && (
          <PanelNotice>
            Không tải được biến động giá.{' '}
            <button
              className="ml-1 font-bold text-primary underline"
              onClick={() => insightsQuery.refetch()}
            >
              Thử lại
            </button>
          </PanelNotice>
        )}
        {insights && <PriceTrendChart insights={insights} />}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
            Điểm tin cậy & Xác thực Blockchain
          </div>
          <InfoButton
            title="Xem giải thích điểm số"
            onClick={() => onExplain(buildTrustExplain(insights))}
          />
        </h3>
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
          Tính từ định danh chủ hộ, hồ sơ pháp lý, kiểm duyệt tin đăng và lịch
          sử hợp đồng.
        </p>

        <div className="bg-surface-muted/30 border border-border rounded-2xl p-4 gap-4 flex flex-1 flex-col justify-between">
          {loading && <div className="h-40 animate-pulse rounded-xl" />}
          {failed && <PanelNotice>Không tải được điểm tin cậy.</PanelNotice>}
          {trust && (
            <>
              <div className="space-y-1 text-left">
                <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
                  Chỉ số Trust Score
                </span>
                <span
                  className={`text-4xl font-display font-black ${tone.text}`}
                >
                  {trust.score}% Điểm Tín nhiệm
                </span>
                <span className="block text-xs font-semibold text-muted-foreground">
                  {tone.label}
                </span>
              </div>

              <div className="space-y-3 border-t border-border pt-4 text-left">
                {trust.items.map(item => (
                  <div
                    key={item.key}
                    className={`flex items-center gap-3 text-sm font-bold ${item.ok ? 'text-fg/90' : 'text-muted-foreground'}`}
                  >
                    <svg
                      className={`h-5 w-5 shrink-0 ${item.ok ? 'text-success' : 'text-muted-foreground/60'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.ok ? 'm4.5 12.75 6 6 9-13.5' : 'M6 12h12'}
                      />
                    </svg>
                    <span className="flex-1">{item.label}</span>
                    <span className="font-mono text-xs">
                      {item.points}/{item.maxPoints}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
