import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  createAdminDesign,
  deleteAdminDesign,
  listAdminDesigns,
  listApartmentDesigns,
  updateAdminDesign,
} from './floorplan-designs-api'

describe('floorplan designs API', () => {
  it('reads visible designs from the public endpoint and drops malformed rows', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValueOnce([
      { id: 'a', name: 'A', theme: 'warm' },
      { id: '', name: 'bad' },
    ])

    const result = await listApartmentDesigns('apt 1')

    expect(get).toHaveBeenCalledWith('/apartments/apt%201/designs')
    expect(result.map(design => design.id)).toEqual(['a'])
    get.mockRestore()
  })

  it('uses the admin endpoints for list, create, update and delete', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue([])
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({})
    const patch = vi.spyOn(apiClient, 'patch').mockResolvedValue({})
    const del = vi.spyOn(apiClient, 'delete').mockResolvedValue(undefined)

    await listAdminDesigns('a1')
    await createAdminDesign('a1', {
      name: 'N',
      description: '',
      theme: 'modern',
      palette: {},
      furnishing: null,
      defaultHour: 10,
      layout: { items: {}, extras: [] },
      visible: true,
    })
    await updateAdminDesign('a1', 'd1', { visible: false })
    await deleteAdminDesign('a1', 'd1')

    expect(get).toHaveBeenCalledWith('/apartments/a1/designs/admin')
    expect(post).toHaveBeenCalledWith(
      '/apartments/a1/designs/admin',
      expect.objectContaining({ name: 'N', visible: true })
    )
    expect(patch).toHaveBeenCalledWith('/apartments/a1/designs/admin/d1', {
      visible: false,
    })
    expect(del).toHaveBeenCalledWith('/apartments/a1/designs/admin/d1')
    for (const spy of [get, post, patch, del]) spy.mockRestore()
  })

  it('sends the whole layout with an update and keeps it when listing public designs', async () => {
    const layout = {
      items: { 'sofa-1': { x: 1, z: 2 } },
      extras: [{ id: 'extra-1', kind: 'chair' as const, x: 3, z: 4, rot: 0 }],
    }
    const patch = vi.spyOn(apiClient, 'patch').mockResolvedValue({})
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce([{ id: 'a', name: 'A', theme: 'warm', layout }])

    await updateAdminDesign('a1', 'd1', { layout })
    const [design] = await listApartmentDesigns('a1')

    expect(patch).toHaveBeenCalledWith('/apartments/a1/designs/admin/d1', {
      layout,
    })
    expect(design?.layout).toEqual(layout)
    patch.mockRestore()
    get.mockRestore()
  })
})
