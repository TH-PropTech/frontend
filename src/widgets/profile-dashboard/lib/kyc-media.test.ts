import { describe, expect, it, vi } from 'vitest'
import { attachMediaStream } from './kyc-media'

describe('attachMediaStream', () => {
  it('binds the stream and starts the mounted video preview', () => {
    const video = document.createElement('video')
    const stream = {} as MediaStream
    const play = vi.spyOn(video, 'play').mockResolvedValue(undefined)

    attachMediaStream(video, stream)

    expect(video.srcObject).toBe(stream)
    expect(play).toHaveBeenCalledOnce()
  })

  it('does nothing when either preview element or stream is unavailable', () => {
    const video = document.createElement('video')
    const play = vi.spyOn(video, 'play').mockResolvedValue(undefined)

    attachMediaStream(null, {} as MediaStream)
    attachMediaStream(video, null)

    expect(video.srcObject).toBeFalsy()
    expect(play).not.toHaveBeenCalled()
  })
})
