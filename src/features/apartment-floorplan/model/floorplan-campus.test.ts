import { describe, expect, it } from 'vitest'
import type { FloorplanConfig } from './floorplan-config'
import { toFloorplanCampus } from './floorplan-campus'

const config: FloorplanConfig = {
  version: 1,
  apartmentId: 'apt-1',
  bedrooms: 2,
  bathrooms: 1,
  areaM2: 70,
  furnishing: 'full',
}

describe('toFloorplanCampus', () => {
  it('sa bàn một tòa, đúng một căn sáng là căn đang xem', () => {
    const campus = toFloorplanCampus(config, 'Căn A', 'Vinhomes')
    expect(campus.buildings).toHaveLength(1)
    const unit = campus.buildings[0]!.units[0]!
    expect(campus.buildings[0]!.units).toHaveLength(1)
    expect(unit).toMatchObject({
      apartmentId: 'apt-1',
      has3d: true,
      bedrooms: 2,
    })
    expect(unit.floor).toBeGreaterThanOrEqual(3)
    expect(unit.floor).toBeLessThanOrEqual(campus.buildings[0]!.floors)
    expect(unit.slot).toBeGreaterThanOrEqual(0)
    expect(unit.slot).toBeLessThan(4)
  })

  it('vị trí cửa sổ ổn định theo mã căn', () => {
    const a = toFloorplanCampus(config, 'x').buildings[0]!.units[0]!
    const b = toFloorplanCampus(config, 'y').buildings[0]!.units[0]!
    expect([a.floor, a.slot]).toEqual([b.floor, b.slot])
  })
})
