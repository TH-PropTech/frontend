import { describe, expect, it } from 'vitest'
import { sanitizeTimelineEvent } from './transaction-timeline'

describe('transaction timeline', () => {
  it('keeps only the participant-safe event fields', () => {
    const event = sanitizeTimelineEvent({
      id: 'event-1',
      eventType: 'deposit.paid',
      status: 'completed',
      occurredAt: '2026-09-30T00:00:00.000Z',
      summary: 'Deposit paid',
      actorRole: 'tenant',
    })
    expect(event).toEqual(
      expect.objectContaining({ id: 'event-1', eventType: 'deposit.paid' })
    )
    expect(event).not.toHaveProperty('rawPayload')
  })
})
