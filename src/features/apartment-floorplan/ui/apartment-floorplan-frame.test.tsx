import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FloorplanConfig } from '../model/floorplan-config'
import { toFloorplanCampus } from '../model/floorplan-campus'
import { ApartmentFloorplanFrame } from './apartment-floorplan-frame'

const LOAD_TIMEOUT_MS = 10_000

const config: FloorplanConfig = {
  version: 1,
  apartmentId: 'apt-1',
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 75,
  furnishing: 'full',
}

describe('ApartmentFloorplanFrame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('times out again after the user retries', () => {
    render(<ApartmentFloorplanFrame config={config} onClose={() => {}} />)

    act(() => {
      vi.advanceTimersByTime(LOAD_TIMEOUT_MS)
    })
    expect(screen.getByText('Mã lỗi: FRAME_TIMEOUT')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(screen.queryByText(/Mã lỗi/)).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(LOAD_TIMEOUT_MS)
    })
    expect(screen.getByText('Mã lỗi: FRAME_TIMEOUT')).toBeInTheDocument()
  })

  it('expands to the full window when the viewer asks and collapses on Escape', () => {
    render(<ApartmentFloorplanFrame config={config} onClose={() => {}} />)
    const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
    expect(frame).toHaveAttribute('allowfullscreen')
    const container = frame.parentElement?.parentElement as HTMLElement
    expect(container.className).not.toContain('fixed')

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { version: 1, type: 'FLOORPLAN_EXPAND_TOGGLE' },
          origin: window.location.origin,
          source: frame.contentWindow,
        })
      )
    })
    expect(container.className).toContain('fixed inset-0')

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(container.className).not.toContain('fixed')
  })

  describe('layout editing', () => {
    const post = (frame: HTMLIFrameElement, data: unknown): void => {
      act(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data,
            origin: window.location.origin,
            source: frame.contentWindow,
          })
        )
      })
    }
    const initPayloads = (spy: ReturnType<typeof vi.spyOn>): unknown[] =>
      spy.mock.calls
        .map(call => call[0] as { type?: string; payload?: unknown })
        .filter(message => message.type === 'FLOORPLAN_INIT')
        .map(message => message.payload)

    it('opts the viewer into editing only when the host allows it', () => {
      render(
        <ApartmentFloorplanFrame config={config} variant="bare" editable />
      )
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
      const spy = vi.spyOn(frame.contentWindow as Window, 'postMessage')

      post(frame, { version: 1, type: 'FLOORPLAN_READY' })

      expect(initPayloads(spy).at(-1)).toMatchObject({ editable: true })
    })

    it('never sends the editable flag to a public viewer, even if the config carries it', () => {
      render(
        <ApartmentFloorplanFrame
          config={{ ...config, editable: true }}
          variant="bare"
        />
      )
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
      const spy = vi.spyOn(frame.contentWindow as Window, 'postMessage')

      post(frame, { version: 1, type: 'FLOORPLAN_READY' })

      const payload = initPayloads(spy).at(-1) as Record<string, unknown>
      expect(payload).toBeTruthy()
      expect(payload).not.toHaveProperty('editable')
    })

    it('hands a normalized layout draft to the host when editing is on', () => {
      const onLayoutChange = vi.fn()
      render(
        <ApartmentFloorplanFrame
          config={config}
          variant="bare"
          editable
          onLayoutChange={onLayoutChange}
        />
      )
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement

      post(frame, {
        version: 1,
        type: 'FLOORPLAN_LAYOUT_CHANGED',
        payload: {
          designId: 'd1',
          layout: {
            items: { 'sofa-1': { x: 1, z: 2 }, 'bad id': { x: 1 } },
            extras: [],
          },
        },
      })

      expect(onLayoutChange).toHaveBeenCalledWith('d1', {
        items: { 'sofa-1': { x: 1, z: 2 } },
        extras: [],
      })
    })

    it('ignores layout drafts in a read-only frame and from untrusted sources', () => {
      const onLayoutChange = vi.fn()
      const { rerender } = render(
        <ApartmentFloorplanFrame
          config={config}
          variant="bare"
          onLayoutChange={onLayoutChange}
        />
      )
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
      const draft = {
        version: 1,
        type: 'FLOORPLAN_LAYOUT_CHANGED',
        payload: { designId: 'd1', layout: { items: {}, extras: [] } },
      }

      post(frame, draft)
      expect(onLayoutChange).not.toHaveBeenCalled()

      rerender(
        <ApartmentFloorplanFrame
          config={config}
          variant="bare"
          editable
          onLayoutChange={onLayoutChange}
        />
      )
      act(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: draft,
            origin: 'https://evil.example',
            source: frame.contentWindow,
          })
        )
      })
      expect(onLayoutChange).not.toHaveBeenCalled()
    })
  })

  describe('campus', () => {
    const post = (frame: HTMLIFrameElement, data: unknown): void => {
      act(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data,
            origin: window.location.origin,
            source: frame.contentWindow,
          })
        )
      })
    }
    const types = (spy: ReturnType<typeof vi.spyOn>): string[] =>
      spy.mock.calls.map(call => (call[0] as { type: string }).type)

    it('mở sa bàn trước: chỉ gửi CAMPUS_INIT, chưa gửi INIT của căn', () => {
      const campus = toFloorplanCampus(config, 'Căn A')
      render(<ApartmentFloorplanFrame config={config} campus={campus} />)
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
      const spy = vi.spyOn(frame.contentWindow as Window, 'postMessage')

      post(frame, { version: 1, type: 'FLOORPLAN_READY' })

      expect(types(spy)).toContain('FLOORPLAN_CAMPUS_INIT')
      expect(types(spy)).not.toContain('FLOORPLAN_INIT')
    })

    it('bấm căn sáng (UNIT_SELECTED) thì mới gửi INIT đầy đủ', () => {
      const campus = toFloorplanCampus(config, 'Căn A')
      render(<ApartmentFloorplanFrame config={config} campus={campus} />)
      const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
      const spy = vi.spyOn(frame.contentWindow as Window, 'postMessage')

      post(frame, { version: 1, type: 'FLOORPLAN_READY' })
      post(frame, {
        version: 1,
        type: 'FLOORPLAN_UNIT_SELECTED',
        payload: { apartmentId: 'apt-1' },
      })

      expect(types(spy)).toContain('FLOORPLAN_INIT')
    })
  })
})
