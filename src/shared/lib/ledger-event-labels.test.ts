import { describe, expect, it } from 'vitest'
import { ledgerAggregateLabel, ledgerEventLabel } from './ledger-event-labels'

describe('ledgerEventLabel', () => {
  it.each([
    ['contract.activated', 'Kích hoạt hợp đồng'],
    ['createContract', 'Kích hoạt hợp đồng'],
    ['deposit.paid', 'Thanh toán đặt cọc'],
    ['deposit.released', 'Giải ngân tiền cọc'],
    ['deposit.refunded', 'Hoàn trả tiền cọc'],
    ['payment.paid', 'Thanh toán'],
    ['contract.amendment-effective', 'Phụ lục có hiệu lực'],
    ['contract.terminated', 'Chấm dứt hợp đồng'],
    ['governance.published', 'Phát hành bản chốt quản trị'],
    ['GOVERNANCE_SNAPSHOT_PUBLISHED', 'Phát hành bản chốt quản trị'],
    ['move-in.settled', 'Quyết toán nhận nhà'],
    ['MOVE_IN_SETTLED', 'Quyết toán nhận nhà'],
    ['handover.completed', 'Bàn giao nhận nhà'],
    ['HANDOVER_RECORDED', 'Bàn giao nhận nhà'],
  ])('labels the known event %s', (type, label) => {
    expect(ledgerEventLabel(type)).toBe(label)
  })

  it('renders a safe generic label for an unknown future event type', () => {
    expect(ledgerEventLabel('future.event-type')).toBe('future event type')
    expect(ledgerEventLabel('FUTURE_THING_HAPPENED')).toBe(
      'FUTURE THING HAPPENED'
    )
  })

  it('strips markup and control characters from unknown values', () => {
    expect(ledgerEventLabel('<img src=x onerror=1>evil')).toBe(
      'img src x onerror 1 evil'
    )
    expect(ledgerEventLabel('a'.repeat(200)).length).toBeLessThanOrEqual(48)
  })

  it('falls back when the value is empty or unusable', () => {
    expect(ledgerEventLabel('')).toBe('Sự kiện sổ cái')
    expect(ledgerEventLabel('   ')).toBe('Sự kiện sổ cái')
    expect(ledgerEventLabel(null)).toBe('Sự kiện sổ cái')
    expect(ledgerEventLabel('!!!')).toBe('Sự kiện sổ cái')
  })
})

describe('ledgerAggregateLabel', () => {
  it('labels the supported aggregates and humanizes unknown ones', () => {
    expect(ledgerAggregateLabel('contract')).toBe('Hợp đồng')
    expect(ledgerAggregateLabel('deposit')).toBe('Đặt cọc')
    expect(ledgerAggregateLabel('payment')).toBe('Thanh toán')
    expect(ledgerAggregateLabel('contract-amendment')).toBe('Phụ lục')
    expect(ledgerAggregateLabel('governance-snapshot')).toBe(
      'Bản chốt quản trị'
    )
    expect(ledgerAggregateLabel('move-in-settlement')).toBe(
      'Quyết toán nhận nhà'
    )
    expect(ledgerAggregateLabel('move-in-handover')).toBe('Bàn giao nhận nhà')
    expect(ledgerAggregateLabel('brand-new-thing')).toBe('brand new thing')
  })
})
