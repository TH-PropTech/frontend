import { describe, expect, it } from 'vitest'
import {
  apartmentChangePercent,
  buildPriceTrendModel,
} from './price-trend-model'

const months = ['2026-01', '2026-02', '2026-03', '2026-04']

describe('price trend model', () => {
  it('reports no data when every series is empty', () => {
    const model = buildPriceTrendModel({
      months,
      apartment: [null, null, null, null],
      project: null,
      district: null,
      projectName: null,
      districtName: null,
      projectSampleCount: 0,
      districtSampleCount: 0,
    })
    expect(model.hasData).toBe(false)
  })

  it('splits a line at months without data and scales to the data range', () => {
    const model = buildPriceTrendModel({
      months,
      apartment: [null, 13_000_000, 13_000_000, 14_000_000],
      project: [12_000_000, 12_500_000, null, 13_000_000],
      district: null,
      projectName: 'A',
      districtName: 'Q1',
      projectSampleCount: 3,
      districtSampleCount: 0,
    })
    expect(model.hasData).toBe(true)
    const keys = model.lines.map(line => line.key)
    expect(keys).toEqual(['project', 'apartment'])
    expect(model.lines[0]?.segments).toHaveLength(2)
    expect(model.lines[1]?.segments).toHaveLength(1)
    expect(model.ticks[0]?.label).toMatch(/Tr$/)
    expect(model.lines[1]?.last?.value).toBe(14_000_000)
  })

  it('computes apartment change only with two known points', () => {
    const series = {
      months,
      apartment: [null, 12_000_000, null, 15_000_000],
      project: null,
      district: null,
      projectName: null,
      districtName: null,
      projectSampleCount: 0,
      districtSampleCount: 0,
    }
    expect(apartmentChangePercent(series)?.percent).toBeCloseTo(25)
    expect(
      apartmentChangePercent({ ...series, apartment: [null, null, null, 1] })
    ).toBeNull()
  })
})
