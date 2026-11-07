/**
 * Display labels for sanitized ledger event types and aggregates. Event types arrive both as the
 * business form (`move-in.settled`) and as the chaincode/timeline form (`MOVE_IN_SETTLED`), so lookups
 * normalise separators and case. Anything not yet known renders as a cleaned generic label instead
 * of failing, which keeps new backend event families forward compatible.
 */

const EVENT_FALLBACK = 'Sự kiện sổ cái'
const MAX_GENERIC_LENGTH = 48

const EVENT_LABELS: Record<string, string> = {
  contract_activated: 'Kích hoạt hợp đồng',
  createcontract: 'Kích hoạt hợp đồng',
  deposit_paid: 'Thanh toán đặt cọc',
  deposit_released: 'Giải ngân tiền cọc',
  deposit_refunded: 'Hoàn trả tiền cọc',
  payment_paid: 'Thanh toán',
  recordpayment: 'Thanh toán',
  penalty_assessed: 'Lãi chậm trả tiền thuê',
  recordpenalty: 'Lãi chậm trả tiền thuê',
  contract_amendment_effective: 'Phụ lục có hiệu lực',
  contract_terminated: 'Chấm dứt hợp đồng',
  governance_published: 'Phát hành bản chốt quản trị',
  governance_snapshot_published: 'Phát hành bản chốt quản trị',
  move_in_settled: 'Quyết toán nhận nhà',
  recordmoveinsettlement: 'Quyết toán nhận nhà',
  handover_completed: 'Bàn giao nhận nhà',
  handover_recorded: 'Bàn giao nhận nhà',
  recordhandover: 'Bàn giao nhận nhà',
}

const AGGREGATE_LABELS: Record<string, string> = {
  contract: 'Hợp đồng',
  deposit: 'Đặt cọc',
  payment: 'Thanh toán',
  penalty: 'Lãi chậm trả',
  contract_amendment: 'Phụ lục',
  governance_snapshot: 'Bản chốt quản trị',
  move_in_settlement: 'Quyết toán nhận nhà',
  move_in_handover: 'Bàn giao nhận nhà',
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function genericLabel(value: string): string {
  return value
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .slice(0, MAX_GENERIC_LENGTH)
    .trim()
}

export function ledgerEventLabel(eventType: string | null | undefined): string {
  if (!eventType) return EVENT_FALLBACK
  return (
    EVENT_LABELS[normalizeKey(eventType)] ??
    (genericLabel(eventType) || EVENT_FALLBACK)
  )
}

export function ledgerAggregateLabel(
  aggregateType: string | null | undefined
): string {
  if (!aggregateType) return EVENT_FALLBACK
  return (
    AGGREGATE_LABELS[normalizeKey(aggregateType)] ??
    (genericLabel(aggregateType) || EVENT_FALLBACK)
  )
}
