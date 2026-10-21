import type { PriceTrendSeries } from '../api/apartment-insights-api'

export const CHART = { left: 40, right: 380, top: 20, bottom: 170 } as const

export interface TrendLine {
  key: 'apartment' | 'project' | 'district'
  /** Mỗi đoạn liên tục (tách khi gặp tháng chưa có dữ liệu). */
  segments: Array<Array<{ x: number; y: number }>>
  last: { x: number; y: number; value: number } | null
}

export interface PriceTrendModel {
  ticks: Array<{ y: number; label: string }>
  monthLabels: Array<{ x: number; label: string }>
  lines: TrendLine[]
  hasData: boolean
}

const MILLION = 1_000_000

function formatMillions(value: number): string {
  const millions = value / MILLION
  return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}Tr`
}

function formatMonth(label: string): string {
  const [year = '', month = ''] = label.split('-')
  return `T${Number(month)}/${year.slice(-2)}`
}

/** Chia trục giá thành 4 mức đều nhau, làm tròn theo 0,5 triệu để nhãn gọn. */
function niceRange(values: number[]): { min: number; max: number } {
  const lowest = Math.min(...values)
  const highest = Math.max(...values)
  const step = 0.5 * MILLION
  let min = Math.floor((lowest * 0.95) / step) * step
  let max = Math.ceil((highest * 1.05) / step) * step
  if (max - min < 2 * MILLION) {
    const middle = (min + max) / 2
    min = Math.floor((middle - MILLION) / step) * step
    max = min + 2 * MILLION
  }
  return { min: Math.max(0, min), max }
}

/** Dựng tọa độ biểu đồ từ chuỗi giá của API; trục y co giãn theo dữ liệu thật. */
export function buildPriceTrendModel(
  series: PriceTrendSeries
): PriceTrendModel {
  const candidates: Array<[TrendLine['key'], Array<number | null> | null]> = [
    ['district', series.district],
    ['project', series.project],
    ['apartment', series.apartment],
  ]
  const values = candidates
    .flatMap(([, data]) => data ?? [])
    .filter((value): value is number => value !== null)
  if (!values.length) {
    return { ticks: [], monthLabels: [], lines: [], hasData: false }
  }

  const { min, max } = niceRange(values)
  const count = series.months.length
  const xAt = (index: number): number =>
    count <= 1
      ? CHART.right
      : CHART.left + ((CHART.right - CHART.left) * index) / (count - 1)
  const yAt = (value: number): number =>
    CHART.bottom - ((value - min) / (max - min)) * (CHART.bottom - CHART.top)

  const lines: TrendLine[] = candidates.flatMap(([key, data]) => {
    if (!data) return []
    const segments: TrendLine['segments'] = []
    let current: TrendLine['segments'][number] = []
    let last: TrendLine['last'] = null
    data.forEach((value, index) => {
      if (value === null) {
        if (current.length) segments.push(current)
        current = []
        return
      }
      const point = { x: xAt(index), y: yAt(value) }
      current.push(point)
      last = { ...point, value }
    })
    if (current.length) segments.push(current)
    return segments.length ? [{ key, segments, last }] : []
  })

  const ticks = [0, 1, 2, 3].map(step => {
    const value = max - ((max - min) * step) / 3
    return { y: yAt(value), label: formatMillions(value) }
  })
  const labelIndexes = Array.from(
    new Set([
      0,
      Math.round((count - 1) / 3),
      Math.round(((count - 1) * 2) / 3),
      count - 1,
    ])
  )
  const monthLabels = labelIndexes.map(index => ({
    x: xAt(index),
    label: formatMonth(series.months[index] ?? ''),
  }))

  return { ticks, monthLabels, lines, hasData: true }
}

/** Biến động % giữa điểm đầu và điểm cuối có dữ liệu của căn hộ, null nếu chưa đủ 2 điểm khác nhau. */
export function apartmentChangePercent(
  series: PriceTrendSeries
): { percent: number; from: number; to: number } | null {
  const known = series.apartment.filter(
    (value): value is number => value !== null
  )
  const from = known[0]
  const to = known[known.length - 1]
  if (known.length < 2 || from === undefined || to === undefined) return null
  return { percent: ((to - from) / from) * 100, from, to }
}
